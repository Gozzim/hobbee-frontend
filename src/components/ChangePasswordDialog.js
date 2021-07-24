import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, Snackbar } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { SignInUpInput } from "./SignInUpInput";
import { PasswordEye } from "./PasswordEye";
import {
  getPasswordStrength,
  isValidPassword,
} from "../validators/UserDataValidator";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { changePasswordRequest } from "../services/UserService";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginBottom: "20px",
  },
  changePasswordButton: {
    width: "182px",
    padding: "8px 10px",
    backgroundColor: "#ffdb4d",
    color: "black",
    "&:hover": {
      backgroundColor: "#fff0b3",
    },
  },
}));

const initialSnackbar = {
  open: false,
  severity: "",
  message: "",
};

export function ChangePasswordDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(initialSnackbar);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [oldPassError, setOldPassError] = useState("");
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleOpen = () => {
    setSnackbar(initialSnackbar);
    setOldPassword("");
    setOldPassError("");
    setPassword("");
    setPassword2("");
    setPassError("");
    setPasswordStrength(0);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((snackbar) => {
      return { ...snackbar, open: false };
    });
  };

  const handleChangePassword = async () => {
    if (
      passError !== "" ||
      oldPassError !== "" ||
      oldPassword === "" ||
      password === "" ||
      password2 === ""
    ) {
      return;
    }
    try {
      await changePasswordRequest(oldPassword, password);
      setSnackbar((snackbar) => {
        return {
          ...snackbar,
          open: true,
          severity: "success",
          message: "Password changed!",
        };
      });
    } catch (e) {
      console.log(e.message);
      setSnackbar((snackbar) => {
        return {
          ...snackbar,
          open: true,
          severity: "error",
          message: "Password change failed!",
        };
      });
    }
    handleClose();
  };

  const onChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
    if (e.target.value === "") {
      setOldPassError("Required for authentication");
    } else {
      setOldPassError("");
    }
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
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
    <div>
      <Button onClick={handleOpen} className={classes.changePasswordButton}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <SignInUpInput
            id={"old-password"}
            className={classes.textfield}
            label={"Old Password"}
            fieldValue={oldPassword}
            changeFunc={onChangeOldPassword}
            fieldType={showPassword ? "text" : "password"}
            inputError={oldPassError !== ""}
            autoComplete={"current-password"}
            errorMessage={oldPassError}
          />
          <SignInUpInput
            id={"password"}
            className={classes.textfield}
            label={"New Password"}
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
            inputError={passError !== ""}
            autoComplete={"new-password"}
          />
          <SignInUpInput
            id={"password2"}
            className={classes.textfield}
            label={"Repeat Password"}
            fieldValue={password2}
            changeFunc={onChangePassword2}
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
            inputError={passError !== "" && password2 !== ""}
            autoComplete={"new-password"}
            errorMessage={passError}
          />
          {passwordStrength > 0 && (
            <PasswordStrengthBar passStrength={passwordStrength} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            NO
          </Button>
          <Button onClick={handleChangePassword} color="inherit">
            YES
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
