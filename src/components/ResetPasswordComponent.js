import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import {
  getPasswordStrength,
  isValidPassword,
} from "../validators/UserDataValidator";
import { SignInUpInput } from "./SignInUpInput";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { HOBBEE_ORANGE, HOBBEE_YELLOW } from "../shared/Constants";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/reducers/userReducer";
import { PasswordEye } from "./PasswordEye";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  resetPassRoot: {
    margin: "auto",
    width: "60%",
  },
  heading: {
    paddingBottom: theme.spacing(5),
  },
  caption: {
    paddingBottom: theme.spacing(2),
  },
  submitButton: {
    backgroundColor: HOBBEE_ORANGE,
    "&:hover": {
      backgroundColor: HOBBEE_YELLOW,
    },
  },
}));

/**
 * Reset Pass
 * @param {props} props
 */
export function ResetPasswordComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (passError !== "") {
      return;
    }
    try {
      dispatch(
        resetPassword(
          props.match.params.user,
          props.match.params.token,
          password
        )
      ); // TODO: Server answer handling
      props.history.push("/"); // TODO: Only if successful
    } catch (e) {
      console.log(e.message);
    }
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    // TODO: Fix ugly if statements
    if (e.target.value === "") {
      setPassError("");
    } else if (!isValidPassword(e.target.value)) {
      setPassError("Invalid Password");
    } else if (password2 !== "" && password2 !== e.target.value) {
      setPassError("Passwords do not match.");
    } else {
      setPassError("");
    }
    setPasswordStrength(getPasswordStrength(e.target.value));
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
    // TODO: Fix ugly if statements
    if (password !== "") {
      if (password !== e.target.value && e.target.value !== "") {
        setPassError("Passwords do not match.");
      } else if (!isValidPassword(password)) {
        setPassError("Invalid Password");
      } else {
        setPassError("");
      }
    }
  };

  return (
    <div className={classes.resetPassRoot}>
      <div>
        <Typography className={classes.heading} variant="h4" align="center">
          Account recovery
        </Typography>
        <Typography className={classes.caption} align="center">
          Choose a new password to recover your Hobb.ee account
        </Typography>
      </div>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SignInUpInput
              id={"password"}
              label={"New Password"}
              fieldValue={password}
              changeFunc={onChangePassword}
              fieldType={showPassword ? "text" : "password"}
              inputProps={{
                endAdornment: (
                  <PasswordEye
                    onClickEye={() => {
                      setShowPassword(!showPassword);
                    }}
                    isShown={showPassword}
                  />
                ),
              }}
              inputError={passError !== ""}
              autoComplete={"new-password"}
            />
          </Grid>
          <Grid item>
            <SignInUpInput
              id={"password2"}
              label={"Repeat Password"}
              fieldValue={password2}
              changeFunc={onChangePassword2}
              fieldType={showPassword ? "text" : "password"}
              inputProps={{
                endAdornment: (
                  <PasswordEye
                    onClickEye={() => {
                      setShowPassword(!showPassword);
                    }}
                    isShown={showPassword}
                  />
                ),
              }}
              inputError={passError !== "" && password2 !== ""}
              autoComplete={"new-password"}
            />
          </Grid>
          {passwordStrength > 0 && (
            <Grid item>
              <PasswordStrengthBar passStrength={passwordStrength} />
            </Grid>
          )}
          {error ? (
            <Grid item>
              <Typography color="error">{error}</Typography>
            </Grid>
          ) : null}
          <Grid item>
            <Button
              fullWidth
              className={classes.submitButton}
              size={"large"}
              variant="contained"
              color="primary"
              type="submit"
            >
              Change password
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
