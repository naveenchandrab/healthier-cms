/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Paper,
  makeStyles
} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  tableCell: {
    padding: 16
  }
});

const DataTable = ({ data, onVideoPlay, onUpdate, onDelete }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
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
            data.map(dta => (
              <TableRow key={dta._id}>
                <TableCell className={classes.tableCell} padding="none">
                  {dta.name}
                </TableCell>
                <TableCell className={classes.tableCell} padding="none">
                  {dta.description}
                </TableCell>
                <TableCell className={classes.tableCell} padding="none">
                  <IconButton onClick={() => onVideoPlay(dta.video)}>
                    <PlayIcon />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell} padding="none">
                  <Box display="flex" justifyContent="flex-end">
                    <Box marginRight={2}>
                      <IconButton onClick={() => onUpdate(dta._id)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                    <IconButton onClick={() => onDelete(dta._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  onVideoPlay: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};

export default DataTable;
