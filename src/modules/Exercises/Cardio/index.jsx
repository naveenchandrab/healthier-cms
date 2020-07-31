/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import {
  Box,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getExercises } from '../../../utils/apis/exercises';
import CardioForm from './CardioForm';
import VIdeoPlayerFun from '../../../components/common/VideoPlayer/VIdeoPlayerFun';

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
  setLoading
}) => {
  const classes = useStyles();

  const getData = async () => {
    setLoading(true);
    const result = await getExercises();
    setExercises(result);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [exercise]);

  return (
    <Box>
      <VIdeoPlayerFun src="https://v.redd.it/4dl54tigwss41/DASH_240" />
      <Box marginBottom={2}>
        <Typography variant="h6">Cardio Excersises</Typography>
      </Box>
      <Box marginBottom={4}>
        <CardioForm
          data={exercise}
          setData={setExercise}
          setLoading={setLoading}
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
                      <PlayIcon />
                      {/* {exrcise.video} */}
                    </TableCell>
                    <TableCell className={classes.tableCell} padding="none">
                      <Box display="flex" justifyContent="flex-end">
                        <Box marginRight={2}>
                          <Button variant="outlined" color="primary">
                            Update
                          </Button>
                        </Box>
                        <Button variant="contained" color="primary">
                          Delete
                        </Button>
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
  setLoading: PropTypes.func
};

export default Cardio;
