import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Typography } from "@material-ui/core";
import HobbeeIcon from "../assets/hobbee_white.svg";
import { Link } from "react-router-dom";
import { HOBBEE_ORANGE, HOBBEE_YELLOW } from "../shared/Constants";
import { SignInUpInput } from "./SignInUpInput";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";
import { PasswordEye } from "./PasswordEye";
import { useDispatch } from "react-redux";
import { setAuthError } from "../redux/reducers/userReducer";

const useStyles = makeStyles((theme) => ({
  userLoginRoot: {
    margin: "auto",
    width: "60%",
  },
  bottomSpacing: {
    paddingTop: theme.spacing(2),
  },
  loginRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(0),
    },
    "&:first-child": {
      paddingTop: theme.spacing(0),
    },
  },
  submitRow: {
    "& button": {
      backgroundColor: HOBBEE_ORANGE,
      "&:hover": {
        backgroundColor: HOBBEE_YELLOW,
      },
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

/*
 * TODO:
 *  - Add server response error handling
 */
export function LoginComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    if (props.user.error) {
      setLoginError("Invalid login credentials");
      dispatch(setAuthError(null));
    }
  }, [props.user.error]);

  const onSubmit = (e) => {
    e.preventDefault();
    props.onLogin(username, password);
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
    <div className={classes.userLoginRoot}>
      <div className={classes.loginRow}>
        <img src={HobbeeIcon} width={"100%"} alt={"logo"} />
      </div>
      <form onSubmit={onSubmit}>
        <div className={classes.loginRow}>
          <SignInUpInput
            id={"username"}
            label={"Username or Email"}
            fieldValue={username}
            changeFunc={onChangeUsername}
            inputLabelProps={{ required: false }}
            inputError={loginError !== ""}
            autoComplete={"username"}
          />
        </div>
        <div className={classes.loginRow}>
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
        </div>
        {loginError !== "" && (
          <div className={classes.loginRow}>
            <Typography color="error">{loginError}</Typography>
          </div>
        )}
        <div className={classes.submitRow}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign In
          </Button>
        </div>
        <Divider key={"divider"} />
        <div>
          <Typography
            className={classes.bottomSpacing}
            align="center"
            style={{ fontWeight: "bold" }}
          >
            New to Hobb.ee?{" "}
            <Link
              style={{ color: HOBBEE_ORANGE, textDecoration: "none" }}
              to={"/register"}
            >
              Create an account
            </Link>
          </Typography>
        </div>
        <div>
          <Typography
            className={classes.bottomSpacing}
            align="center"
            variant="body2"
          >
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => setForgotOpen(true)}
            >
              Forgot Password?
            </Link>
          </Typography>
        </div>
      </form>
      <ForgotPasswordDialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </div>
  );
}
