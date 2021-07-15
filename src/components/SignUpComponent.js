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
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { formatISO } from "date-fns";
import { TagAutocomplete } from "./TagAutocomplete";
import { TagComponent } from "./TagComponent";
import { isUsernameAvailable } from "../services/UserService";

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

const initialRegisterState = {
  pending: false,
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  bday: null,
  hobbies: [],
};

const initialErrors = {
  general: "",
  mail: "",
  name: "",
  pass: "",
};

export function SignUpComponent(props) {
  const classes = useStyles();

  const [registerError, setRegisterError] = React.useState(initialErrors);
  const [registerState, setRegisterState] = React.useState(initialRegisterState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState(0);

  const changeRegisterError = (fieldWithValue) => {
    setRegisterError({
      ...registerError,
      ...fieldWithValue
    })
  };

  const changeRegisterState = (fieldWithValue) => {
    setRegisterState({
      ...registerState,
      ...fieldWithValue
    })
  };

  const passEye = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          tabIndex={"-1"}
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
    if (registerError.pass !== "" || registerError.name !== "" || registerError.mail !== "") {
      return;
    }
    try {
      const date = formatISO(registerState.bday);
      props.onRegister(registerState.username, registerState.email, registerState.password, date, registerState.hobbies); // TODO: handle server response errors
    } catch (e) {
      console.log(e.message); // TODO: Date Error Handling
    }
  };

  const onChangeUsername = async (e) => {
    changeRegisterState({ username: e.target.value });
    if (e.target.value !== "" && !isValidUsername(e.target.value)) {
      changeRegisterError({name: "Invalid username"});
    } else {
      const usernameUsedResp = await isUsernameAvailable(e.target.value);
      if (!usernameUsedResp.isUsernameAvailable) {
        changeRegisterError({name: "Username already in use"});
      } else {
        changeRegisterError({name: ""});
      }
    }
  };

  const onChangeEmail = (e) => {
    changeRegisterState({ email: e.target.value });
    if (e.target.value !== "" && !isValidEmail(e.target.value.toLowerCase())) {
      changeRegisterError({mail: "Invalid Email"});
    } else {
      changeRegisterError({mail: ""});
    }
  };

  const onChangePassword = (e) => {
    changeRegisterState({ password: e.target.value });
    // TODO: Fix ugly if statements
    if (e.target.value === "") {
      changeRegisterError({pass: ""});
    } else if (!isValidPassword(e.target.value)) {
      changeRegisterError({pass: "Passwords must be at least 6 characters long, contain upper & lower case letters and at least one number or special character"});
    } else if (registerState.confirmPassword !== "" && registerState.confirmPassword !== e.target.value) {
      changeRegisterError({pass: "Passwords do not match"});
    } else {
      changeRegisterError({pass: ""});
    }
    setPasswordStrength(getPasswordStrength(e.target.value));
  };

  const onChangePassword2 = (e) => {
    changeRegisterState({ confirmPassword: e.target.value });
    // TODO: Fix ugly if statements
    if (registerState.password !== "") {
      if (registerState.password !== e.target.value && e.target.value !== "") {
        changeRegisterError({pass: "Passwords do not match"});
      } else if (!isValidPassword(registerState.password)) {
        changeRegisterError({pass: "Passwords must be at least 6 characters long, contain upper & lower case letters and at least one number or special character"});
      } else {
        changeRegisterError({pass: ""});
      }
    }
  };

  const onChangeBday = (e) => {
    changeRegisterState({ bday: e });
  };

  return (
    <div className={classes.usersignUpRoot}>
      <div>
        <img src={HobbeeIcon} width={"100%"} alt={"logo"} />
        <Typography variant="h4" align="center">
          Let's Bee Active!
        </Typography>
      </div>
      <form onSubmit={onSubmit}>
        <div className={classes.signUpRow}>
          <SignInUpInput
            id={"username"}
            label={"Username"}
            fieldValue={registerState.username}
            changeFunc={onChangeUsername}
            inputError={registerError.name !== ""}
            errorMessage={registerError.name}
            autoComplete={"username"}
          />
        </div>
        <div className={classes.signUpRow}>
          <SignInUpInput
            id={"email"}
            label={"Email"}
            fieldValue={registerState.email}
            changeFunc={onChangeEmail}
            inputError={registerError.mail !== ""}
            errorMessage={registerError.mail}
            autoComplete={"email"}
          />
        </div>
        <div className={classes.signUpRow}>
          <SignInUpInput
            id={"password"}
            label={"Password"}
            fieldValue={registerState.password}
            changeFunc={onChangePassword}
            fieldType={showPassword ? "text" : "password"}
            inputProps={passEye}
            inputError={registerError.pass !== ""}
            errorMessage={registerError.pass}
            autoComplete={"new-password"}
          />
        </div>
        <div className={classes.signUpRow}>
          <SignInUpInput
            id={"password2"}
            label={"Repeat Password"}
            fieldValue={registerState.confirmPassword}
            changeFunc={onChangePassword2}
            fieldType={showPassword ? "text" : "password"}
            inputProps={passEye}
            inputError={registerError.pass !== "" && registerState.confirmPassword !== ""}
            autoComplete={"new-password"}
          />
        </div>
        {passwordStrength > 0 && (
          <PasswordStrengthBar passStrength={passwordStrength} />
        )}
        <div className={classes.signUpRow}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableFuture
              fullWidth
              required
              variant={"inline"}
              inputVariant={"outlined"}
              id={"bday"}
              label={"Date of birth"}
              value={registerState.bday}
              onChange={onChangeBday}
              format={"dd.MM.yyyy"}
              KeyboardButtonProps={{ edge: "end" }}
              autoComplete={"bday"}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.signUpRow}>
          <TagAutocomplete
            onChange={(tags) => {
              changeRegisterState({hobbies: tags})
            }}
            value={registerState.hobbies}
          />
          <div className={"creategroup-tags"}>
            {registerState.hobbies.map((x) => {
              return (
                <TagComponent
                  id={x}
                  key={x}
                  onDelete={() => {
                    changeRegisterState({hobbies: registerState.hobbies.filter((tag) => {
                        return x !== tag;
                      })})
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className={classes.signUpRow}>
          <FormControl>
            <FormControlLabel
              control={<Checkbox required color="primary" />}
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
                  . *
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
