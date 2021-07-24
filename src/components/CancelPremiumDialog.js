import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, DialogContentText } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { sendPremiumCancelRequest } from "../services/paymentService";

const useStyles = makeStyles((theme) => ({
  cancelSubscriptionButton: {
    width: "182px",
    padding: "8px 10px",
    backgroundColor: "#ff7d66",
    color: "black",
    "&:hover": {
      backgroundColor: "#ffd4cc",
    },
  },
}));

export function CancelPremiumDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUnsubscribe = async () => {
    try {
      await sendPremiumCancelRequest();
      props.setCanceled(true);
    } catch (e) {
      console.log(e);
    }
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} className={classes.cancelSubscriptionButton}>
        Cancel Subscription
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "black" }}>
            Are you sure you want to cancel your HOBB.EE Premium subscription?
            Your subscription will not be renewed after the next payment period.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            NO
          </Button>
          <Button onClick={handleUnsubscribe} color="inherit">
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}