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
import { HOBBEE_ORANGE } from "../shared/Constants";
import { forgotPasswordRequest } from "../services/UserService";
import { SignInUpInput } from "./SignInUpInput";

export function ForgotPasswordDialog(props) {
  const [email, setEmail] = useState("");
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    try {
      await forgotPasswordRequest(email);
      setError("");
      setFinished(true);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const closeMe = async () => {
    props.onClose();
    setEmail("");
    setError("");
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
            <Button
              onClick={props.onClose}
              variant="contained"
              color="primary"
              style={{ backgroundColor: HOBBEE_ORANGE }}
            >
              Close
            </Button>
          </DialogActions>
        </div>
      ) : (
        <div>
          <DialogContent>
            <DialogContentText>
              Enter your email address below and we will send instructions on
              how to reset your password.
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
              <div style={{}}>
                <Typography color="error">{error}</Typography>
              </div>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose} color="primary" type={"cancel"}>
              Cancel
            </Button>
            <Button
                onClick={onSubmit}
              variant="contained"
              color="primary"
              type="submit"
              style={{ backgroundColor: HOBBEE_ORANGE }}
            >
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
