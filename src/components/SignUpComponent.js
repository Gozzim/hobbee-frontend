import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from "@material-ui/core";
import { HobbySelector } from "./HobbySelectorComponent";
import {
  getPasswordStrength,
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../validators/UserDataValidator";

const useStyles = makeStyles((theme) => ({
  usersignUpRoot: {
    margin: "auto",
  },
  signUpPaper: {
    width: "500px",
    padding: theme.spacing(2),
  },
  signUpRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(0),
    },
    "&:first-child": {
      paddingTop: theme.spacing(0),
    },
  },
  signUpButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  signUpButton: {
    marginLeft: theme.spacing(1),
  },
  greenBar: {
    "&:MuiLinearProgress-barColorPrimary": {
      backgroundColor: "green",
    },
    "&:MuiLinearProgress-colorPrimary": {
      backgroundColor: "light-green",
    },
  },
}));

const passwordColors = [
  "red", // Too Weak
  "orange", // Weak
  "yellow", // Medium
  "green", // Strong
];

export function SignUpComponent(props) {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [hobbies, setHobbies] = React.useState([]);
  const [acceptedTOS, setAcceptedTOS] = React.useState(false);

  const [registerError, setRegisterError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [mailError, setMailError] = React.useState("");
  const [passwordStrength, setPasswordStrength] = React.useState(0);

  useEffect(() => {
    if (props.user.error) {
      setRegisterError(props.user.error);
    } else {
      setRegisterError("");
    }
  }, [props.user]);

  const onRegister = (e) => {
    e.preventDefault();
    // TODO
    // Temporary Implementation
    if (!isValidEmail(email.toLowerCase())) {
      setMailError("Invalid Email");
    }
    if (!isValidUsername(username)) {
      setNameError("Invalid Username");
    }
    if (!isValidPassword(password)) {
      setRegisterError("Invalid Password");
    }
    const hasError = () => {
      return registerError !== "" || nameError !== "" || mailError !== "";
    };
    if (hasError) {
      console.log("error")
      return;
    }
    props.onRegister(username, email, password, hobbies);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setNameError("");
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setMailError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setRegisterError("");
    setPasswordStrength(getPasswordStrength(e.target.value));
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
    setRegisterError("");
  };

  const onBlurPassword = (e) => {
    if (password !== "" && password2 !== "") {
      if (password !== password2) {
        setRegisterError("Passwords do not match.");
      } else {
        setRegisterError("");
      }
    }
  };

  return (
    <div className={classes.usersignUpRoot}>
      <Paper className={classes.signUpPaper} component="form">
        <div className={classes.signUpRow}>
          <Typography variant="h4" align="center">
            Welcome to Hobb.ee!
          </Typography>
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Username"
            required
            fullWidth
            variant="outlined"
            autoFocus
            value={username}
            onChange={onChangeUsername}
            error={nameError !== ""}
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Email"
            required
            fullWidth
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
            error={mailError !== ""}
            autoComplete="email"
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Password"
            required
            fullWidth
            variant="outlined"
            value={password}
            onChange={onChangePassword}
            error={registerError !== ""}
            onBlur={onBlurPassword}
            type="password"
            autoComplete="new-password"
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Repeat Password"
            required
            fullWidth
            variant="outlined"
            value={password2}
            onChange={onChangePassword2}
            error={registerError !== ""}
            onBlur={onBlurPassword}
            type="password"
            autoComplete="new-password"
          />
        </div>
        {passwordStrength > 0 && (
          <div>
            <LinearProgress
              variant="determinate"
              value={passwordStrength * 25}
              className={classes.greenBar} //TODO
            />
            <Typography variant="body2">{"$Strength Password"}</Typography>{" "}
            {/*TODO*/}
          </div>
        )}
        <div className={classes.signUpRow}>
          <HobbySelector />
        </div>
        <div className={classes.signUpRow}>
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptedTOS}
                onChange={(e) => setAcceptedTOS(e.target.checked)}
                color="primary"
              />
            }
            label="TOS"
          />
        </div>
        {registerError !== "" ? (
          <div className={classes.signUpRow}>
            <Typography color="error">{registerError}</Typography>
          </div>
        ) : null}
        <div className={classes.signUpRow + " " + classes.signUpButtons}>
          <Button className={classes.signUpButton} onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            className={classes.signUpButton}
            variant="contained"
            color="primary"
            onClick={onRegister}
            disabled={
              username === "" ||
              email === "" ||
              password === "" ||
              password2 === "" ||
              password !== password2
            }
            type="submit"
          >
            Register
          </Button>
        </div>
      </Paper>
    </div>
  );
}
