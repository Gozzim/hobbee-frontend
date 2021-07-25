import React from "react";
import {
  Checkbox,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { reportUserRequest } from "../services/UserService";
import FlagIcon from '@material-ui/icons/Flag';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    marginTop: 0,
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

const BlueCheckbox = withStyles({
  root: {
    '&$checked': {
      color: "#17C2BC",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const initialReportForm = {
  comment: "",
  inappropriateUsername: false,
  threatsEtc: false,
  hateSpeechEtc: false,
  spamEtc: false,
  inappropriateContent: false,
  noShow: false,
  other: false,
};

//prop is username of reported person
export function ReportUserDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [reportForm, setReportForm] = React.useState(initialReportForm);
  const [touched, setTouched] = React.useState({checkboxes: false, comment: false});
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);

  const {
    comment,
    inappropriateUsername,
    threatsEtc,
    hateSpeechEtc,
    spamEtc,
    inappropriateContent,
    noShow,
    other,
  } = reportForm;
  const checkedElements =
    [
      inappropriateUsername,
      threatsEtc,
      hateSpeechEtc,
      spamEtc,
      inappropriateContent,
      noShow,
      other,
    ].filter((v) => v).length;

  const handleOpen = () => {
    setReportForm(initialReportForm);
    setTouched({checkboxes: false, comment: false});
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setReportForm({ ...reportForm, [event.target.name]: event.target.checked });
    setTouched({ ...touched, checkboxes: true });
  };

  const handleReport = async () => {
    if (!checkedElements < 1 && !(reportForm.other && reportForm.comment === "")) {
      try {
        await reportUserRequest({
          username: props.username,
          reportForm: reportForm,
        });
        handleClose();
        handleConfirmationOpen();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setTouched({checkboxes: true, comment: true});
    }
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };
  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <CustomTooltip title="Report User">
          <IconButton onClick={handleOpen} style={{ position: "absolute", transform: "translateY(-12px)" }}>
            <FlagIcon />
          </IconButton>
        </CustomTooltip>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Report User</DialogTitle>
        <DialogContent>
          <FormControl
            required
            error={checkedElements < 1}
            component="fieldset"
            className={classes.formControl}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={reportForm.inappropriateUsername}
                    onChange={handleChange}
                    name="inappropriateUsername"
                  />
                }
                label="Inappropriate username"
              />
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={reportForm.threatsEtc}
                    onChange={handleChange}
                    name="threatsEtc"
                  />
                }
                label="Threats, harm, or endangerment of someone"
              />
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={reportForm.hateSpeechEtc}
                    onChange={handleChange}
                    name="hateSpeechEtc"
                  />
                }
                label="Hate speech, harassment, or abuse"
              />
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={reportForm.spamEtc}
                    onChange={handleChange}
                    name="spamEtc"
                  />
                }
                label="Spam, malicious links, or bot accounts"
              />
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={reportForm.inappropriateContent}
                    onChange={handleChange}
                    name="inappropriateContent"
                  />
                }
                label="Inappropriate or obscene content / behaviour"
              />
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={reportForm.noShow}
                    onChange={handleChange}
                    name="noShow"
                  />
                }
                label="No-show"
              />
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={reportForm.other}
                    onChange={handleChange}
                    name="other"
                  />
                }
                label="Other"
              />
            </FormGroup>
            {touched.checkboxes && checkedElements < 1 ? (
              <FormHelperText disabled={true}>
                You must check at least one box
              </FormHelperText>
            ) : null}
          </FormControl>
          <TextField
            label="Comment"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            value={reportForm.comment}
            onChange={(event) => {
              setReportForm((reportForm) => {
                return { ...reportForm, comment: event.target.value };
              });
              setTouched({ ...touched, comment: true });
            }}
            error={
              reportForm.other && reportForm.comment === "" && touched.comment
            }
            helperText={
              reportForm.other && reportForm.comment === "" && touched.comment
                ? "Please specify further"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleReport}
            color="inherit"
            className={classes.updateButton}
          >
            Send Report
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Report Received</DialogTitle>
        <DialogContent>
          <DialogContentText style={{color: "black"}}>
            Thank you for helping us make Hobb.ee a better place.
          </DialogContentText>
          <DialogContentText style={{color: "black"}}>
            A staff member will process your user report soon. You may be
            contacted via email to provide additional information, so keep an
            eye out!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="inherit">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
