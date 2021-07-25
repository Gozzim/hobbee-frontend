import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button, Divider, Snackbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Alert } from "@material-ui/lab";

import { login, setAuthError } from "../../redux/reducers/userReducer";
import {
  BUTTON_BLUE,
  BUTTON_BLUE_HOVER,
  HOBBEE_ORANGE,
} from "../../shared/Constants";
import HobbeeIcon from "../../assets/hobbee_white.svg";
import { SignInUpInput } from "../../components/UserDataInput/SignInUpInput";
import { PasswordEye } from "../../components/UserDataInput/PasswordEye";
import { ForgotPasswordDialog } from "../../components/UserDataInput/ForgotPasswordDialog";

const useStyles = makeStyles(() => ({
  userLoginRoot: {
    margin: "auto",
    width: "60%",
  },
  submitButton: {
    padding: "8px 10px",
    backgroundColor: BUTTON_BLUE,
    "&:hover": {
      backgroundColor: BUTTON_BLUE_HOVER,
    },
  },
}));

function SignInView(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    if (user.error) {
      setLoginError("Invalid login credentials");
      dispatch(setAuthError(null));
    }
  }, [user.error, dispatch]);

  useEffect(() => {
    if (user.user) {
      let targetPath = "/";
      try {
        // get last visited site for redirect
        targetPath = sessionStorage.getItem("last_visited");
      } catch (e) {
        // sessionStorage not supported
      }
      props.history.push(targetPath);
    }
  }, [user, props.history]);

  const onClose = () => {
    props.history.replace(props.location.pathname);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.dispatch(login({ username, password }));
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setLoginError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setLoginError("");
  };

  return (
    <>
      <Snackbar
        open={props.location.hash === "#forbidden"}
        autoHideDuration={6000}
        onClose={(_event, reason) => {
          // Only close after autoHideDuration expired
          if (reason === "timeout") {
            onClose();
          }
        }}
      >
        <Alert variant={"filled"} onClose={onClose} severity="error">
          Please sign in to access this page.
        </Alert>
      </Snackbar>
      <div className={classes.userLoginRoot}>
        <div>
          <img src={HobbeeIcon} width={"100%"} alt={"logo"} />
        </div>
        <form onSubmit={onSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <SignInUpInput
                id={"username"}
                label={"Username or Email"}
                fieldValue={username}
                changeFunc={onChangeUsername}
                inputLabelProps={{ required: false }}
                inputError={loginError !== ""}
                autoComplete={"username"}
              />
            </Grid>
            <Grid item>
              <SignInUpInput
                id={"password"}
                label={"Password"}
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
                inputLabelProps={{ required: false }}
                inputError={loginError !== ""}
                autoComplete={"current-password"}
              />
            </Grid>
            {loginError !== "" && (
              <Grid item>
                <Typography color="error">{loginError}</Typography>
              </Grid>
            )}
            <Grid item>
              <Button fullWidth className={classes.submitButton} type="submit">
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Divider key={"divider"} />
            </Grid>
            <Grid item>
              <Typography align="center" style={{ fontWeight: "bold" }}>
                New to Hobb.ee?{" "}
                <Link
                  style={{ color: HOBBEE_ORANGE, textDecoration: "none" }}
                  to={"/register"}
                >
                  Create an account
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="body2">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setForgotOpen(true)}
                >
                  Forgot Password?
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
        <ForgotPasswordDialog
          open={forgotOpen}
          onClose={() => setForgotOpen(false)}
        />
      </div>
    </>
  );
}

export default connect()(withRouter(SignInView));
