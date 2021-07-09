import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
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
import { SignInUpInput } from "./SignInUpInput";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { HOBBEE_ORANGE, HOBBEE_YELLOW } from "../shared/Constants";

const useStyles = makeStyles((theme) => ({
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
      backgroundColor: HOBBEE_ORANGE,
      "&:hover": {
        backgroundColor: HOBBEE_YELLOW,
      },
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

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
  const classes = useStyles();

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
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const [registerError, setRegisterError] = React.useState(initialErrors); //TODO
  const [passwordState, setPasswordState] = React.useState(initialPasswordState); //TODO

  const passEye = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (passError !== "" || nameError !== "" || mailError !== "") {
      return;
    }
    props.onRegister(username, email, password, hobbies); // TODO: handle server response errors
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
      <div>
        <img src={HobbeeIcon} width={"100%"} />
        <Typography variant="h4" align="center">
          Let's Bee Active!
        </Typography>
      </div>
      <form onSubmit={onSubmit}>
        <div className={classes.signUpRow}>
          <SignInUpInput
            id={"username"}
            label={"Username"}
            fieldValue={username}
            changeFunc={onChangeUsername}
            inputError={nameError !== ""}
            autoComplete={"username"}
          />
        </div>
        <div className={classes.signUpRow}>
          <SignInUpInput
            id={"email"}
            label={"Email"}
            fieldValue={email}
            changeFunc={onChangeEmail}
            inputError={mailError !== ""}
            autoComplete={"email"}
          />
        </div>
        <div className={classes.signUpRow}>
          <SignInUpInput
            id={"password"}
            label={"Password"}
            fieldValue={password}
            changeFunc={onChangePassword}
            fieldType={showPassword ? "text" : "password"}
            inputProps={passEye}
            inputError={passError !== ""}
            autoComplete={"new-password"}
          />
        </div>
        <div className={classes.signUpRow}>
          <SignInUpInput
            id={"password2"}
            label={"Repeat Password"}
            fieldValue={password2}
            changeFunc={onChangePassword2}
            fieldType={showPassword ? "text" : "password"}
            inputProps={passEye}
            inputError={passError !== "" && password2 !== ""}
            autoComplete={"new-password"}
          />
        </div>
        {passwordStrength > 0 && (
          <PasswordStrengthBar passStrength={passwordStrength} />
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
                  I agree to Hobb.ee's{" "}
                  <Link
                    style={{ textDecoration: "underline", color: "black" }}
                    to={"/tos"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    terms of service
                  </Link>{" "}
                  and{" "}
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
        <div className={classes.submitRow}>
          <Button
            fullWidth
            size={"large"}
            variant="contained"
            color="primary"
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
              style={{ color: HOBBEE_ORANGE, textDecoration: "none" }}
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
