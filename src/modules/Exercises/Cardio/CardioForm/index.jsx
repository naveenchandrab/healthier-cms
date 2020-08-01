/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton
} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import ResponsiveGridLayout from '../../../../components/common/ResponsiveGridLayout';
import OutlinedTextField from '../../../../components/common/OutlinedTextField';
import {
  getExerciseCategories,
  getSignedUrl,
  postExercise,
  uploadFileToSignedUrl,
  updateExercise
} from '../../../../utils/apis/exercises';
import VideoPlayer from '../../../../components/common/VideoPlayer';

const CardioForm = ({ data, setData, setLoading, updatedRequested }) => {
  const [categories, setCategories] = useState();
  const [name, setName] = useState(data.name);
  const [category, setCategory] = useState(data.category);
  const [file, setFile] = useState();
  const fileInputRef = useRef();
  const formRef = useRef();
  const [selectedVideo, setSelectedVideo] = useState();
  const [openVideoDialogue, setOpenVideoDialogue] = useState(false);

  const getCategories = async () => {
    const result = await getExerciseCategories();
    setCategories(result);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (file) {
      const { signedUrl } = await getSignedUrl({
        name: file.name,
        type: 'video',
        size: file.size,
        id: 'cardio'
      });
      const fileUrl = await uploadFileToSignedUrl(signedUrl, file);

      const finalObject = {
        name,
        category,
        video: fileUrl
      };
      const result = await postExercise(finalObject);
      setData(result);
      setName('');
      setCategory(0);
      setFile(null);
      setSelectedVideo(null);
      setLoading(false);
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    let fileUrl;
    if (file) {
      const { signedUrl } = await getSignedUrl({
        name: file.name,
        type: 'video',
        size: file.size,
        id: 'cardio'
      });
      fileUrl = await uploadFileToSignedUrl(signedUrl, file);
    }
    const finalObject = {
      name,
      category,
      video: fileUrl || data.video
    };
    const result = await updateExercise(data._id, finalObject);
    setData(result);
    setName('');
    setCategory(0);
    setFile(null);
    setSelectedVideo(null);
    setLoading(false);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = e => {
    setFile(e.target.files[0]);
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setSelectedVideo(objectURL);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setName(data.name);
    setCategory(data.category._id);
    setSelectedVideo(data.video);
  }, [data]);

  return (
    <form
      onSubmit={e => (updatedRequested ? handleUpdate(e) : handleSubmit(e))}
      ref={formRef}
    >
      {openVideoDialogue && (
        <VideoPlayer
          url={selectedVideo}
          open={openVideoDialogue}
          width={800}
          onClose={() => setOpenVideoDialogue(false)}
        />
      )}
      <Box marginBottom={2}>
        <ResponsiveGridLayout minwidth={300}>
          <Box>
            <OutlinedTextField
              fullWidth
              name="name"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box>
            <FormControl fullWidth hiddenLabel variant="outlined" size="small">
              <Select
                name="category"
                fullWidth
                placeholder="select category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                defaultValue={0}
              >
                {categories &&
                  [{ name: 'Select Category', _id: 0 }, ...categories].map(
                    cat => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <input
              ref={fileInputRef}
              style={{ display: 'none' }}
              type="file"
              name="video"
              onChange={onFileChange}
              accept="video/*"
            />
            <Box marginRight={1} component="span">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleUploadButtonClick}
              >
                Upload Video
              </Button>
            </Box>
            {selectedVideo && (
              <IconButton onClick={() => setOpenVideoDialogue(true)}>
                <PlayIcon />
              </IconButton>
            )}
          </Box>
        </ResponsiveGridLayout>
      </Box>
      <Box maxWidth={150}>
        <Button type="submit" fullWidth variant="contained" color="primary">
          {updatedRequested ? 'Update' : 'Submit'}
        </Button>
      </Box>
    </form>
  );
};

CardioForm.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  setLoading: PropTypes.func,
  updatedRequested: PropTypes.bool
};

export default CardioForm;
