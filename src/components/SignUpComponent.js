import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  FormControl,
} from "@material-ui/core";
import { HobbySelector } from "./HobbySelectorComponent";
import {
  getPasswordStrength,
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../validators/UserDataValidator";

const useStyles = (passwordState) =>
  makeStyles((theme) => ({
    usersignUpRoot: {
      margin: "auto",
    },
    signUpBar: {
      width: "60%",
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
    passStrengthBar: {
      width: "60%",
      backgroundColor: "lightgray", //crimson
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: passwordColors[passwordState],
      },
    },
  }));

const passwordColors = ["inherit", "red", "orange", "gold", "limegreen"];

const passwordString = [null, "Too Weak", "Weak", "Medium", "Strong"];

const initialPasswordState = {
  pending: false,
  email: "",
  password: "",
  confirmPassword: "",
  hobbies: [],
  acceptTOS: false,
  errors: false,
};

const initialErrors = {
  mail: null,
  name: null,
  pass: null,
};

export function SignUpComponent(props) {
  // TODO: More of an ugly solution currently
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const classes = useStyles(passwordStrength)();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [hobbies, setHobbies] = React.useState([]);
  const [acceptedTOS, setAcceptedTOS] = React.useState(false);

  const [passError, setPassError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [mailError, setMailError] = React.useState("");
  const [registerError, setRegisterError] = React.useState(initialErrors); //TODO
  const [passwordState, setPasswordState] = React.useState(initialPasswordState); //TODO

  const onSubmit = (e) => {
    e.preventDefault();
    if (passError !== "" || nameError !== "" || mailError !== "") {
      return;
    }
    props.onRegister(username, email, password, hobbies);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value !== "" && !isValidUsername(e.target.value)) {
      setNameError("Invalid Username");
    } else {
      setNameError("");
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== "" && !isValidEmail(e.target.value.toLowerCase())) {
      setMailError("Invalid Email");
    } else {
      setMailError("");
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
    <div className={classes.usersignUpRoot}>
      <form onSubmit={onSubmit}>
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
            className={classes.signUpBar}
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
            className={classes.signUpBar}
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
            error={passError !== ""}
            type="password"
            className={classes.signUpBar}
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
            error={passError !== "" && password2 !== ""}
            type="password"
            className={classes.signUpBar}
            autoComplete="password"
          />
        </div>
        {passwordStrength > 0 && (
          <div>
            <LinearProgress
              variant="determinate"
              value={passwordStrength * 25}
              className={classes.passStrengthBar}
              //style={barStyle}
            />
            <Typography
              variant="body2"
              style={{ color: passwordColors[passwordStrength] }}
            >
              {passwordString[passwordStrength] + " Password"}
            </Typography>
            {/*TODO*/}
          </div>
        )}
        <div className={classes.signUpRow}>
          <HobbySelector />
        </div>
        <div className={classes.signUpRow}>
          <FormControl
            required //TODO
            error={!acceptedTOS}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTOS}
                  onChange={(e) => setAcceptedTOS(e.target.checked)}
                  color="primary"
                />
              }
              label="I agree to Hobb.ee's terms of service and privacy policy."
            />
          </FormControl>
        </div>
        {passError !== "" && (
          <div className={classes.signUpRow}>
            <Typography color="error">{passError}</Typography>
          </div>
        )}
        <div className={classes.signUpRow + " " + classes.signUpButtons}>
          <Button
            className={classes.signUpButton}
            variant="contained"
            color="primary"
            disabled={
              username === "" ||
              email === "" ||
              password === "" ||
              password2 === "" ||
              password !== password2 ||
              !acceptedTOS
            }
            type="submit"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}
