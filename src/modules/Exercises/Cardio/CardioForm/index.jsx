/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, IconButton, Typography } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import ResponsiveGridLayout from '../../../../components/common/ResponsiveGridLayout';
import OutlinedTextField from '../../../../components/common/OutlinedTextField';
import {
  getSignedUrl,
  postExercise,
  uploadFileToSignedUrl,
  updateExercise,
  getExerciseCategories
} from '../../../../utils/apis/exercises';
import VideoPlayer from '../../../../components/common/VideoPlayer';

const CardioForm = ({
  data,
  setData,
  setLoading,
  updatedRequested,
  onUpdate,
  title
}) => {
  const [category, setCategory] = useState();
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [file, setFile] = useState();
  const fileInputRef = useRef();
  const formRef = useRef();
  const [selectedVideo, setSelectedVideo] = useState();
  const [openVideoDialogue, setOpenVideoDialogue] = useState(false);
  const isValid = name && description;

  const resetForm = () => {
    setName('');
    setDescription('');
    setFile(null);
    setSelectedVideo(null);
    setLoading(false);
  };

  const getCategory = async () => {
    const result = await getExerciseCategories();
    const catgry = result.find(cat => cat.name === 'Cardio');
    setCategory(catgry._id);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (file) {
      setLoading(true);
      const { signedUrl } = await getSignedUrl({
        name: file.name,
        type: 'video',
        size: file.size,
        id: 'cardio'
      });
      const fileUrl = await uploadFileToSignedUrl(signedUrl, file);

      const finalObject = {
        name,
        description,
        category,
        video: fileUrl
      };
      const result = await postExercise(finalObject);
      setData(result);
      resetForm();
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
      description,
      category,
      video: fileUrl || data.video
    };
    const result = await updateExercise(data._id, finalObject);
    setData(result);
    resetForm();
    onUpdate();
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
    setName(data.name);
    setDescription(data.description);
    if (data.name === name) setName('');
    setSelectedVideo(data.video);
  }, [data]);

  // useEffect(() => {
  //   setFile(data.video);
  // }, [updatedRequested]);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <form
      onSubmit={e => (updatedRequested ? handleUpdate(e) : handleSubmit(e))}
      ref={formRef}
    >
      <Box
        marginBottom={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">{title}</Typography>
        <Box minWidth={150}>
          <Button
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {updatedRequested ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Box>
      {openVideoDialogue && (
        <VideoPlayer
          url={selectedVideo}
          open={openVideoDialogue}
          width={800}
          onClose={() => setOpenVideoDialogue(false)}
          autoPlay
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
            <OutlinedTextField
              fullWidth
              name="description"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
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
    </form>
  );
};

CardioForm.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  onUpdate: PropTypes.func,
  setLoading: PropTypes.func,
  updatedRequested: PropTypes.bool,
  title: PropTypes.string
};

export default CardioForm;
