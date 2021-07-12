import React from "react";
import PropTypes from "prop-types";
import { LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const passwordColors = ["inherit", "red", "orange", "gold", "limegreen"];
const passwordString = [null, "Very Weak", "Weak", "Medium", "Strong"];

export function PasswordStrengthBar(props) {
  const useStyles = makeStyles((theme) => ({
    passStrengthBar: {
      height: "5px",
      borderRadius: "5px",
      backgroundColor: "lightgray", //crimson
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: passwordColors[props.passStrength],
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={props.passStrength * 25}
        className={classes.passStrengthBar}
      />
      <Typography
        variant="body2"
        style={{ color: passwordColors[props.passStrength] }}
      >
        {passwordString[props.passStrength] + " Password"}
      </Typography>
    </>
  );
}

// attributes of props and their type
PasswordStrengthBar.propTypes = {
  passStrength: PropTypes.number.isRequired,
};
