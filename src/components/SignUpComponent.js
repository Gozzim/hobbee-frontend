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
  Divider,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { HobbySelector } from "./HobbySelectorComponent";
import {
  getPasswordStrength,
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../validators/UserDataValidator";
import { Link } from "react-router-dom";
import HobbeeIcon from "../assets/hobbee_white.svg";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = (passwordState) =>
  makeStyles((theme) => ({
    usersignUpRoot: {
      margin: "auto",
      width: "60%",
    },
    bottomSpacing: {
      paddingTop: theme.spacing(2),
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
    passStrengthBar: {
      backgroundColor: "lightgray", //crimson
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: passwordColors[passwordState],
      },
    },
  }));

const passwordColors = ["inherit", "red", "orange", "gold", "limegreen"];

const passwordString = [null, "Very Weak", "Weak", "Medium", "Strong"];

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
  const [showPassword, setShowPassword] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(initialErrors); //TODO
  const [passwordState, setPasswordState] = React.useState(initialPasswordState); //TODO

  const onSubmit = (e) => {
    e.preventDefault();
    if (passError !== "" || nameError !== "" || mailError !== "") {
      return;
    }
    props.onRegister(username, email, password, hobbies); // TODO: handle server response errors
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          <img src={HobbeeIcon} width={"100%"} />
          <Typography variant="h4" align="center">
            Let's Bee Active!
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
            error={passError !== ""}
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
        <div className={classes.signUpRow}>
          <TextField
            label="Repeat Password"
            required
            fullWidth
            variant="outlined"
            value={password2}
            onChange={onChangePassword2}
            error={passError !== "" && password2 !== ""}
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
              label={
                <>
                  I agree to Hobb.ee's&nbsp;
                  <Link
                    style={{ textDecoration: "underline", color: "black" }}
                    to={"/tos"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    terms of service
                  </Link>{" "}
                  and&nbsp;
                  <Link
                    style={{ textDecoration: "underline", color: "black" }}
                    to={"/privacy"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    privacy policy
                  </Link>
                  .
                </>
              }
            />
          </FormControl>
        </div>
        {/* removed, errors will show in fields instead
        passError !== "" && (
          <div className={classes.signUpRow}>
            <Typography color="error">{passError}</Typography>
          </div>
        )*/}
        <div className={classes.submitRow}>
          <Button
            fullWidth
            size={"large"}
            variant="contained"
            color="primary"
            /* removed, handling will be taken care of by errors and validations
            disabled={
              username === "" ||
              email === "" ||
              password === "" ||
              password2 === "" ||
              password !== password2 ||
              !acceptedTOS
            }*/
            type="submit"
          >
            Create Account
          </Button>
        </div>
        <Divider key={"divider"} />
        <div>
          <Typography
            className={classes.bottomSpacing}
            align="center"
            style={{ fontWeight: "bold" }}
          >
            Already got a Hobb.ee Account?{" "}
            <Link
              style={{ color: "#E98F1C", textDecoration: "none" }}
              to={"/login"}
            >
              Login here
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
}
