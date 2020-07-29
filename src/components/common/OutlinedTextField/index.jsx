import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, OutlinedInput } from '@material-ui/core';

const OutlinedTextField = ({
  value,
  onChange,
  defaultValue,
  placeholder,
  multiline,
  name,
  ...others
}) => {
  return (
    <FormControl size="small" hiddenLabel variant="outlined" {...others}>
      <OutlinedInput
        name={name}
        multiline={multiline}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

OutlinedTextField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  multiline: PropTypes.bool,
  defaultValue: PropTypes.string
};

export default OutlinedTextField;
