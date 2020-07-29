import React from 'react';
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
import OutlinedTextField from '../../../components/common/OutlinedTextField';
import ResponsiveGridLayout from '../../../components/common/ResponsiveGridLayout';

const useStyles = makeStyles({
  tableCell: {
    padding: 16
  }
});

const Cardio = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant="h6">Cardio Excersises</Typography>
      </Box>
      <Box marginBottom={4}>
        <form>
          <Box marginBottom={2}>
            <ResponsiveGridLayout minwidth={300}>
              <Box>
                <OutlinedTextField fullWidth name="name" placeholder="Name" />
              </Box>
              <Box>
                <OutlinedTextField
                  fullWidth
                  name="category"
                  placeholder="Category"
                />
              </Box>
              <Box>
                <Button variant="outlined" color="primary">
                  Upload Video
                </Button>
              </Box>
            </ResponsiveGridLayout>
          </Box>
          <Box maxWidth={150}>
            <Button fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
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
              <TableRow>
                <TableCell className={classes.tableCell} padding="none">
                  a
                </TableCell>
                <TableCell className={classes.tableCell} padding="none">
                  a
                </TableCell>
                <TableCell className={classes.tableCell} padding="none">
                  a
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
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Cardio;
