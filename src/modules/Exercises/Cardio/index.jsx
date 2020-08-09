/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import {
  getExercises,
  deleteExercise,
  getExercise
} from '../../../utils/apis/exercises';
import CardioForm from './CardioForm';
import VideoPlayer from '../../../components/common/VideoPlayer';
import DataTable from '../DataTable';

const Cardio = ({
  exercises,
  exercise,
  setExercise,
  setExercises,
  setLoading,
  showDialogueBox,
  showSnackbar
}) => {
  const [activeVideo, setActiveVideo] = useState();
  const [openVideoDialogue, setOpenVideoDialogue] = useState(false);
  const [updatedRequested, setUpdatedRequested] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await getExercises();
      setExercises(result);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    try {
      setLoading(true);
      await deleteExercise(id);
      getData();
      setLoading(false);
      showSnackbar({
        show: true,
        message: 'Exercise Deleted..!'
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdate = async id => {
    const data = await getExercise(id);
    setExercise(data);
    setUpdatedRequested(true);
  };

  const onDeleteButtonClick = id => {
    const dialogueBoxProps = {
      open: true,
      title: 'Are you sure, you want to delete this exercise ?',
      description: 'Exercise will be deleted permanently',
      cancelButtonText: 'Cancel',
      onOk: () => handleDelete(id),
      okButtonText: 'Delete'
    };
    showDialogueBox(dialogueBoxProps);
  };

  useEffect(() => {
    getData();
  }, [exercise]);

  return (
    <Box>
      {openVideoDialogue && (
        <VideoPlayer
          url={activeVideo}
          open={openVideoDialogue}
          width={800}
          onClose={() => setOpenVideoDialogue(false)}
          autoPlay
        />
      )}
      <Box marginBottom={6}>
        <CardioForm
          title="Cardio Excersises"
          updatedRequested={updatedRequested}
          data={exercise}
          setData={setExercise}
          setLoading={setLoading}
          onUpdate={() => setUpdatedRequested(false)}
        />
      </Box>
      <Box>
        <DataTable
          data={exercises}
          onVideoPlay={video => {
            setOpenVideoDialogue(true);
            setActiveVideo(video);
          }}
          onUpdate={id => handleUpdate(id)}
          onDelete={id => onDeleteButtonClick(id)}
        />
      </Box>
    </Box>
  );
};

Cardio.propTypes = {
  exercises: PropTypes.array,
  exercise: PropTypes.object,
  setExercise: PropTypes.func,
  setExercises: PropTypes.func,
  showDialogueBox: PropTypes.func,
  setLoading: PropTypes.func,
  showSnackbar: PropTypes.func
};

export default Cardio;
