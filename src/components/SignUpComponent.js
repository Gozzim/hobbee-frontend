import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
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
import { SignInUpInput } from "./SignInUpInput";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { ERRORS, HOBBEE_ORANGE, HOBBEE_YELLOW } from "../shared/Constants";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { formatISO } from "date-fns";
import { TagAutocomplete } from "./TagAutocomplete";
import { TagComponent } from "./TagComponent";
import { isUsernameAvailable } from "../services/UserService";
import { PasswordEye } from "./PasswordEye";
import { setAuthError } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  userSignUpRoot: {
    margin: "auto",
    width: "60%",
  },
  submitButton: {
    backgroundColor: HOBBEE_ORANGE,
    "&:hover": {
      backgroundColor: HOBBEE_YELLOW,
    },
  },
}));

const initialRegisterState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  bday: null,
  hobbies: [],
};

const initialErrors = {
  general: "",
  email: "",
  username: "",
  password: "",
};

export function SignUpComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [registerError, setRegisterError] = useState(initialErrors);
  const [registerState, setRegisterState] = useState(initialRegisterState);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const minAge = new Date();
  minAge.setFullYear(minAge.getFullYear() - 18);

  useEffect(() => {
    if (props.user.error) {
      changeRegisterError({
        general:
          "Something went wrong. Maybe you already have a Hobb.ee account.",
      });
      dispatch(setAuthError(null));
    }
  }, [props.user.error]);

  const changeRegisterError = (fieldWithValue) => {
    setRegisterError({
      ...registerError,
      ...fieldWithValue,
    });
  };

  const changeRegisterState = (fieldWithValue) => {
    setRegisterState({
      ...registerState,
      ...fieldWithValue,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      registerError.password !== "" ||
      registerError.username !== "" ||
      registerError.email !== "" ||
      registerState.bday > minAge
    ) {
      return;
    }
    try {
      const date = formatISO(registerState.bday);
      props.onRegister(
        registerState.username,
        registerState.email,
        registerState.password,
        date,
        registerState.hobbies
      );
    } catch (e) {
      changeRegisterError({
        general:
          "Oops, something went wrong. Please try again or contact our support.",
      });
    }
  };

  const onChangeUsername = async (e) => {
    changeRegisterState({ username: e.target.value });
    if (e.target.value !== "" && !isValidUsername(e.target.value)) {
      changeRegisterError({ username: "Invalid username" });
    } else {
      const usernameUsedResp = await isUsernameAvailable(e.target.value);
      if (!usernameUsedResp.isUsernameAvailable) {
        changeRegisterError({ username: "Username already in use" });
      } else {
        changeRegisterError({ username: "" });
      }
    }
  };

  const onChangeEmail = (e) => {
    changeRegisterState({ email: e.target.value });
    if (e.target.value !== "" && !isValidEmail(e.target.value.toLowerCase())) {
      changeRegisterError({ email: "Invalid Email" });
    } else {
      changeRegisterError({ email: "" });
    }
  };

  const onChangePassword = (e) => {
    changeRegisterState({ password: e.target.value });
    // TODO: Fix ugly if statements
    if (e.target.value === "") {
      changeRegisterError({ password: "" });
    } else if (!isValidPassword(e.target.value)) {
      changeRegisterError({
        password: ERRORS.weakPassword,
      });
    } else if (
      registerState.confirmPassword !== "" &&
      registerState.confirmPassword !== e.target.value
    ) {
      changeRegisterError({ password: "Passwords do not match" });
    } else {
      changeRegisterError({ password: "" });
    }
    setPasswordStrength(getPasswordStrength(e.target.value));
  };

  const onChangeConfirmPassword = (e) => {
    changeRegisterState({ confirmPassword: e.target.value });
    // TODO: Fix ugly if statements
    if (registerState.password !== "") {
      if (registerState.password !== e.target.value && e.target.value !== "") {
        changeRegisterError({ password: "Passwords do not match" });
      } else if (!isValidPassword(registerState.password)) {
        changeRegisterError({
          password: ERRORS.weakPassword,
        });
      } else {
        changeRegisterError({ password: "" });
      }
    }
  };

  const onChangeBday = (e) => {
    changeRegisterState({ bday: e });
  };

  return (
    <div className={classes.userSignUpRoot}>
      <div>
        <img src={HobbeeIcon} width={"100%"} alt={"logo"} />
        <Typography variant="h4" align="center">
          Let's Bee Active!
        </Typography>
      </div>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SignInUpInput
              id={"username"}
              label={"Username"}
              fieldValue={registerState.username}
              changeFunc={onChangeUsername}
              inputError={registerError.username !== ""}
              errorMessage={registerError.username}
              autoComplete={"username"}
            />
          </Grid>
          <Grid item>
            <SignInUpInput
              id={"email"}
              label={"Email"}
              fieldValue={registerState.email}
              changeFunc={onChangeEmail}
              inputError={registerError.email !== ""}
              errorMessage={registerError.email}
              autoComplete={"email"}
            />
          </Grid>
          <Grid item>
            <SignInUpInput
              id={"password"}
              label={"Password"}
              fieldValue={registerState.password}
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
              inputError={registerError.password !== ""}
              errorMessage={registerError.password}
              autoComplete={"new-password"}
            />
          </Grid>
          <Grid item>
            <SignInUpInput
              id={"password2"}
              label={"Repeat Password"}
              fieldValue={registerState.confirmPassword}
              changeFunc={onChangeConfirmPassword}
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
              inputError={
                registerError.password !== "" &&
                registerState.confirmPassword !== ""
              }
              autoComplete={"new-password"}
            />
          </Grid>
          {passwordStrength > 0 && (
            <Grid item>
              <PasswordStrengthBar passStrength={passwordStrength} />
            </Grid>
          )}
          <Grid item>
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
                KeyboardButtonProps={{ edge: "end", tabIndex: "-1" }}
                maxDate={minAge}
                maxDateMessage={"You must be at least 18 years old to join Hobb.ee"}
                invalidDateMessage={""}
                autoComplete={"bday"}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <TagAutocomplete
              onChange={(tags) => {
                changeRegisterState({ hobbies: tags });
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
                      changeRegisterState({
                        hobbies: registerState.hobbies.filter((tag) => {
                          return x !== tag;
                        }),
                      });
                    }}
                  />
                );
              })}
            </div>
          </Grid>
          <Grid item>
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
          </Grid>
          {registerError.general ? (
            <Grid item>
              <Typography color="error">{registerError.general}</Typography>
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
              Create Account
            </Button>
          </Grid>
          <Grid item>
            <Divider key={"divider"} />
          </Grid>
          <Grid item>
            <Typography align="center" style={{ fontWeight: "bold" }}>
              Already got a Hobb.ee Account?{" "}
              <Link
                style={{ color: HOBBEE_ORANGE, textDecoration: "none" }}
                to={"/login"}
              >
                Login here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
