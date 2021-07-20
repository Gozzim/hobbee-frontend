import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

export function SignInUpInput(props) {
  return (
    <TextField
      label={props.label}
      required
      fullWidth
      variant="outlined"
      value={props.fieldValue}
      onChange={props.changeFunc}
      type={props.fieldType || "text"}
      InputProps={props.inputProps}
      InputLabelProps={props.inputLabelProps}
      error={props.inputError}
      helperText={props.errorMessage}
      autoComplete={props.autoComplete}
    />
  );
}

// attributes of props and their type
SignInUpInput.propTypes = {
  label: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired,
  changeFunc: PropTypes.func.isRequired,
  fieldType: PropTypes.string,
  inputProps: PropTypes.object,
  inputLabelProps: PropTypes.object,
  inputError: PropTypes.bool,
  errorMessage: PropTypes.string,
  autoComplete: PropTypes.string,
};
