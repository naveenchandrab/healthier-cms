/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles({
  tableCell: {
    padding: 16
  }
});

const Cardio = () => {
  const classes = useStyles();
  const [data, setData] = useState();

  const getData = async () => {
    const result = await getExercises();
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant="h6">Cardio Excersises</Typography>
      </Box>
      <Box marginBottom={4}>
        <CardioForm />
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
              {data &&
                data.map(exercise => (
                  <TableRow key={exercise._id}>
                    <TableCell className={classes.tableCell} padding="none">
                      {exercise.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} padding="none">
                      {exercise.category.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} padding="none">
                      {exercise.video}
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

export default Cardio;
