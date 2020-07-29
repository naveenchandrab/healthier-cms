import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, OutlinedInput, InputAdornment } from '@material-ui/core';

const PriceTextField = ({ value, defaultValue, onChange, currency }) => {
  return (
    <FormControl fullWidth size="small" hiddenLabel variant="outlined">
      <OutlinedInput
        value={value}
        type="number"
        onChange={onChange}
        defaultValue={defaultValue}
        startAdornment={
          <InputAdornment position="start">{currency}</InputAdornment>
        }
      />
    </FormControl>
  );
};

PriceTextField.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  currency: PropTypes.string,
  onChange: PropTypes.func
};

export default PriceTextField;
