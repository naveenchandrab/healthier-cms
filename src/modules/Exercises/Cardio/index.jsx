/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  getExercises,
  deleteExercise,
  getExercise
} from '../../../utils/apis/exercises';
import CardioForm from './CardioForm';
import VideoPlayer from '../../../components/common/VideoPlayer';

const useStyles = makeStyles({
  tableCell: {
    padding: 16
  }
});

const Cardio = ({
  exercises,
  exercise,
  setExercise,
  setExercises,
  setLoading,
  showDialogueBox,
  showSnackbar
}) => {
  const classes = useStyles();
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
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Video</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises &&
                exercises.map(exrcise => (
                  <TableRow key={exrcise._id}>
                    <TableCell className={classes.tableCell} padding="none">
                      {exrcise.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} padding="none">
                      {exrcise.category.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} padding="none">
                      <IconButton
                        onClick={() => {
                          setOpenVideoDialogue(true);
                          setActiveVideo(exrcise.video);
                        }}
                      >
                        <PlayIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCell} padding="none">
                      <Box display="flex" justifyContent="flex-end">
                        <Box marginRight={2}>
                          <IconButton onClick={() => handleUpdate(exrcise._id)}>
                            <EditIcon />
                          </IconButton>
                          {/* <Button variant="outlined" color="primary">
                            Update
                          </Button> */}
                        </Box>
                        <IconButton
                          onClick={() => onDeleteButtonClick(exrcise._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
