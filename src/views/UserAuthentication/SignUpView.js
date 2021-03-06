import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { formatISO } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { register, setAuthError } from "../../redux/reducers/userReducer";
import { isUsernameAvailable } from "../../services/UserService";
import {
  getPasswordStrength,
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../validators/UserDataValidator";
import {
  BUTTON_BLUE,
  BUTTON_BLUE_HOVER,
  ERRORS,
  HOBBEE_ORANGE,
} from "../../shared/Constants";
import HobbeeIcon from "../../assets/hobbee_white.svg";
import { SignInUpInput } from "../../components/UserDataInput/SignInUpInput";
import { PasswordEye } from "../../components/UserDataInput/PasswordEye";
import { PasswordStrengthBar } from "../../components/UserDataInput/PasswordStrengthBar";
import { TagAutocomplete } from "../../components/Tag/TagAutocomplete";
import { TagComponent } from "../../components/Tag/TagComponent";
import { createFilterOptions } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  userSignUpRoot: {
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

const initialRegisterState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  bday: null,
  city: "",
  hobbies: [],
};

const initialErrors = {
  general: "",
  email: "",
  username: "",
  password: "",
};

function SignUpView(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [registerError, setRegisterError] = useState(initialErrors);
  const [registerState, setRegisterState] = useState(initialRegisterState);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const minAge = new Date();
  minAge.setFullYear(minAge.getFullYear() - 18);

  useEffect(() => {
    if (user.user) {
      props.history.push("/profile");
    }
  }, [user, props.history]);

  useEffect(() => {
    if (user.error) {
      setRegisterError({
        ...registerError,
        general: "Something went wrong. Maybe you already have a Hobb.ee account.",
      });
      dispatch(setAuthError(null));
    }
  }, [user.error, dispatch, registerError]);

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

  const onChangeHobbyInput = (event, hobbyTag) => {
    setSelectedHobby(hobbyTag);
    if (hobbyTag && !registerState.hobbies.includes(hobbyTag)) {
      try {
        changeRegisterState({ hobbies: [...registerState.hobbies, hobbyTag] });
        setSelectedHobby(null);
      } catch (e) {
        console.log(e.message);
      }
    }
    setInputValue("");
    setSelectedHobby(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      registerError.password !== "" ||
      registerError.username !== "" ||
      registerError.email !== "" ||
      registerState.bday > minAge ||
      registerState.city === ""
    ) {
      return;
    }
    if (registerState.hobbies.length < 2) {
      changeRegisterError({
        general:
            "You need to select at least 2 hobbies.",
      });
      return;
    }
    try {
      const date = formatISO(registerState.bday);
      props.dispatch(
        register({
          username: registerState.username,
          email: registerState.email,
          password: registerState.password,
          dateOfBirth: date,
          city: registerState.city,
          hobbies: registerState.hobbies,
        })
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

  const onChangeCity = (e) => {
    changeRegisterState({ city: e.target.value });
  };

  return (
    <div className={classes.userSignUpRoot}>
      <div>
        <img src={HobbeeIcon} width={"100%"} alt={"logo"} />
        <Typography variant="h4" align="center" style={{fontWeight: "bold", marginBottom: "20px"}}>
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
                  maxDateMessage={
                    "You must be at least 18 years old to join Hobb.ee"
                  }
                  invalidDateMessage={""}
                  autoComplete={"bday"}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <SignInUpInput
                id={"city"}
                label={"City of residence"}
                fieldValue={registerState.city}
                changeFunc={onChangeCity}
                autoComplete={"address-level2"}
            />
          </Grid>
          <Grid item>
            <TagAutocomplete
                onChange={onChangeHobbyInput}
                value={selectedHobby}
                inputValue={inputValue}
                onInputChange={(e, v) => {
                  setInputValue(v);
                }}
                filterSelectedOptions
                filterOptions={createFilterOptions({
                  matchFrom: 'start',
                  stringify: (option => !registerState.hobbies.includes(option) ? option.title : "")

                })
              }
            />
            <div className={"creategroup-tags"}>
              {registerState.hobbies.map((x, i) => {
                return (
                  <div style={{ marginRight: "10px", marginBottom: "5px" }} key={i}>
                    <TagComponent
                      id={x._id}
                      key={x._id}
                      onDelete={() => {
                        changeRegisterState({
                          hobbies: registerState.hobbies.filter((tag) => {
                            return x !== tag;
                          }),
                        });
                      }}
                    />
                  </div>
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
              type="submit"
            >
              Create Account
            </Button>
          </Grid>
          <Grid item>
            <Divider key={"divider"} />
          </Grid>
          <Grid item style={{ marginBottom: "30px" }}>
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

export default connect()(withRouter(SignUpView));
