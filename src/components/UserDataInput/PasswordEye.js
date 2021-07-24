import React from "react";
import PropTypes from "prop-types";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export function PasswordEye(props) {
  return (
    <InputAdornment position="end">
      <IconButton
        tabIndex={"-1"}
        aria-label="toggle password visibility"
        onClick={props.onClickEye}
        edge="end"
      >
        {props.isShown ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}

// attributes of props and their type
PasswordEye.propTypes = {
  onClickEye: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
};
