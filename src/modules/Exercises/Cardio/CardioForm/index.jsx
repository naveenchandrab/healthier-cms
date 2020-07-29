/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import ResponsiveGridLayout from '../../../../components/common/ResponsiveGridLayout';
import OutlinedTextField from '../../../../components/common/OutlinedTextField';
import {
  getExerciseCategories,
  getSignedUrl,
  postExercise,
  uploadFileToSignedUrl
} from '../../../../utils/apis/exercises';

const CardioForm = () => {
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [file, setFile] = useState();
  const fileInputRef = useRef();
  const formRef = useRef();

  const getCategories = async () => {
    const result = await getExerciseCategories();
    setCategories(result);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (file) {
      const formObject = new FormData(formRef.current);
      const { signedUrl } = await getSignedUrl({
        name: file.name,
        type: 'video',
        size: file.size,
        id: 12
      });
      const fileUrl = await uploadFileToSignedUrl(signedUrl, file);
      const finalObject = {
        name: formObject.get('name'),
        category,
        video: fileUrl
      };
      await postExercise(finalObject);
      getCategories();
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = e => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Box marginBottom={2}>
        <ResponsiveGridLayout minwidth={300}>
          <Box>
            <OutlinedTextField fullWidth name="name" placeholder="Name" />
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
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUploadButtonClick}
            >
              Upload Video
            </Button>
          </Box>
        </ResponsiveGridLayout>
      </Box>
      <Box maxWidth={150}>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CardioForm;
