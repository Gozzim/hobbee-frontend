import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { forgotPasswordRequest } from "../../services/UserService";
import { SignInUpInput } from "./SignInUpInput";

export function ForgotPasswordDialog(props) {
  const [email, setEmail] = useState("");
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPasswordRequest(email);
      setError("");
      setFinished(true);
    } catch (e) {
      if (e.response.status && e.response.status === 404) {
        setError("No user with this email found");
      } else {
        setError(e.message);
      }
    }
  };

  const closeMe = async () => {
    setEmail("");
    setError("");
    setFinished(false);
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={closeMe}
      aria-labelledby="form-dialog-title"
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle>Account Recovery</DialogTitle>
      {finished ? (
        <div>
          <DialogContent>
            <DialogContentText>
              An email with a password restoration link has been sent to your
              address.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeMe}>Close</Button>
          </DialogActions>
        </div>
      ) : (
        <div>
          <DialogContent>
            <DialogContentText>
              Enter your email address below and we will send you instructions
              on how to reset your password.
            </DialogContentText>
            <SignInUpInput
              id={"email"}
              label={"Email"}
              autoFocus
              fieldValue={email}
              changeFunc={(event) => {
                setEmail(event.currentTarget.value);
              }}
              inputLabelProps={{ required: false }}
              autoComplete={"email"}
            />
            {error ? (
              <div>
                <Typography color="error">{error}</Typography>
              </div>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose} type={"button"}>
              Cancel
            </Button>
            <Button onClick={onSubmit} type="submit">
              Submit
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
}

ForgotPasswordDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
