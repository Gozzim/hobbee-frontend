import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import HobbeeIcon from "../assets/hobbee_white.svg";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
      backgroundColor: "#E98F1C",
      "&:hover": {
        backgroundColor: "#FFCC00",
      },
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

/*
 * TODO:
 *  - Forgot Password
 *  - Add server response error handling
 *  - Fix error handling
 */
export function LoginComponent(props) {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [loginError, setLoginError] = React.useState("");

  useEffect(() => {
    if (props.user.error) {
      setLoginError(props.user.error);
    } else {
      setLoginError("");
    }
  }, [props.user]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setLoginError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setLoginError("");
  };

  return (
    <div className={classes.userLoginRoot}>
      <div className={classes.signUpRow}>
        <img src={HobbeeIcon} width={"100%"} />
      </div>
      <form onSubmit={onSubmit}>
        <div className={classes.loginRow}>
          <TextField
            label="Email"
            fullWidth
            autoFocus
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
            error={loginError !== ""}
            autoComplete="email"
          />
        </div>
        <div className={classes.loginRow}>
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={onChangePassword}
            error={loginError !== ""}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoComplete="new-password"
          />
        </div>
        {loginError !== "" && (
          <div className={classes.loginRow}>
            <Typography color="error">{loginError}</Typography>
          </div>
        )}
        <div className={classes.submitRow}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
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
              style={{ color: "#E98F1C", textDecoration: "none" }}
              to={"/register"}
            >
              Create an account
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
}
