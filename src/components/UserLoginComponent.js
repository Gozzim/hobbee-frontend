import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userLoginRoot: {
    margin: "auto",
  },
  loginPaper: {
    width: "500px",
    padding: theme.spacing(2),
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
  loginButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  loginButton: {
    marginLeft: theme.spacing(1),
  },
}));

export function LoginComponent(props) {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginError, setLoginError] = React.useState("");

  useEffect(() => {
    // TODO: fix server response error handling
    if (props.user.error) {
      setLoginError(props.user.error);
    } else {
      setLoginError("");
    }
  }, [props.user]);

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
      <form onSubmit={onSubmit}>
        <div className={classes.loginRow}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={onChangeUsername}
            error={loginError !== ""}
          />
        </div>
        <div className={classes.loginRow}>
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={onChangePassword}
            error={loginError !== ""}
            type="password"
          />
        </div>
        {loginError !== "" && (
          <div className={classes.loginRow}>
            <Typography color="error">{loginError}</Typography>
          </div>
        )}
        <div className={classes.loginRow + " " + classes.loginButtons}>
          <Button onClick={props.onSignUp}>Not Registered yet?</Button>
          <div>
            <Button className={classes.loginButton} onClick={props.onCancel}>
              Cancel
            </Button>
            <Button
              className={classes.loginButton}
              variant="contained"
              color="primary"
              disabled={username === "" || password === ""}
              type="submit"
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
