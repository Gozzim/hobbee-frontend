import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { TagAutocomplete } from "./TagAutocomplete";
import { TagComponent } from "./TagComponent";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { formatISO } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { editGroupRequest } from "../services/GroupService";
import DeleteIcon from "@material-ui/icons/Delete";
import {isValidGroupname} from "../validators/GroupDataValidator";
import {ImageUploadComponent} from "./ImageUploadComponent";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginBottom: "20px",
  },
  deleteDateIcon: {
    width: "60px",
    height: "60px",
    marginLeft: "10px",
    marginTop: "14px",
  },
}));

const BlueRadio = withStyles({
  root: {
    color: "grey",
    "&$checked": {
      color: "#17C2BC",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

const initialTouchedState = {
  groupName: false,
  city: false,
  tags: false,
  pic: false,
};

export function EditGroupDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [groupForm, setGroupForm] = React.useState(props.group);
  const [touched, setTouched] = React.useState(initialTouchedState);

  const handleClickOpen = () => {
    setGroupForm(props.group);
    setTouched(initialTouchedState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (
      isValidGroupname(groupForm.groupName) &&
      groupForm.city !== "" &&
      groupForm.tags.length > 0 &&
      (groupForm.maxMembers >= groupForm.groupMembers.length ||
        groupForm.maxMembers === "" ||
        groupForm.maxMembers === 0)
    ) {
      try {
        const newGroup = await editGroupRequest(groupForm);
        props.setGroup(newGroup.data);
        handleClose();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setTouched((touched) => {
        return {
          groupName: true,
          city: true,
          tags: true,
          pic: true,
        };
      });
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <CustomTooltip title="Edit Group">
          <IconButton
            onClick={handleClickOpen}
            color="inherit"
            style={{ position: "absolute", transform: "translateY(-12px)" }}
          >
            <EditIcon />
          </IconButton>
        </CustomTooltip>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Group</DialogTitle>
        <DialogContent>
          <ImageUploadComponent groupForm={groupForm} setGroupForm={setGroupForm} touched={touched} setTouched={setTouched}/>
          <TextField
            label="Group Name"
            className={classes.textfield}
            required
            fullWidth
            variant="outlined"
            //size="small"
            onChange={(event) => {
              setTouched((touched) => {
                return { ...touched, groupName: true };
              });
              setGroupForm((groupForm) => {
                return { ...groupForm, groupName: event.target.value };
              });
            }}
            value={groupForm.groupName}
            error={
              touched.groupName && !isValidGroupname(groupForm.groupName)
            }
            helperText={
              touched.groupName && !isValidGroupname(groupForm.groupName)
                ? "Invalid Group Name"
                : ""
            }
          />
          <TextField
            label="City"
            className={classes.textfield}
            required
            fullWidth
            variant="outlined"
            //size="small"
            onChange={(event) => {
              setTouched((touched) => {
                return { ...touched, city: true };
              });
              setGroupForm((groupForm) => {
                return { ...groupForm, city: event.target.value };
              });
            }}
            value={groupForm.city}
            error={touched.city && groupForm.city === ""}
            helperText={
              touched.city && groupForm.city === ""
                ? "Invalid City"
                : ""
            }
          />
          <FormControl component="fieldset" className={classes.textfield}>
            <RadioGroup
              className={"creategroup-radios"}
              onChange={(event) => {
                setGroupForm((groupForm) => {
                  return { ...groupForm, onOffline: event.target.value };
                });
              }}
              value={groupForm.onOffline}
            >
              <FormControlLabel
                value="online"
                control={<BlueRadio />}
                label="Online"
              />
              <FormControlLabel
                value="offline"
                control={<BlueRadio />}
                label="Offline"
              />
              <FormControlLabel
                value="both"
                control={<BlueRadio />}
                label="Both work for me"
              />
            </RadioGroup>
          </FormControl>
          <TagAutocomplete
            onChange={(tags) => {
              setTouched((touched) => {
                return { ...touched, tags: true };
              });
              setGroupForm((groupForm) => {
                return { ...groupForm, tags };
              });
            }}
            value={groupForm.tags}
            error={touched.tags && groupForm.tags.length === 0}
            helperText={
              touched.tags && groupForm.tags.length === 0
                ? "You need at least one tag"
                : ""
            }
          />
          <div className={"creategroup-tags"}>
            {groupForm.tags.map((x) => {
              return (
                <div style={{ marginRight: "10px", marginBottom: "5px" }}>
                  <TagComponent
                    id={x}
                    key={x}
                    onDelete={() => {
                      setTouched((touched) => {
                        return { ...touched, tags: true };
                      });
                      setGroupForm((groupForm) => {
                        return {
                          ...groupForm,
                          tags: groupForm.tags.filter((tag) => {
                            return x !== tag;
                          }),
                        };
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
          <TextField
            label="Max Number of Participants"
            id="standard-number"
            type="number"
            placeholder={"unlimited"}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setGroupForm((groupForm) => {
                if (parseInt(event.target.value, 10) < 1) {
                  return { ...groupForm, maxMembers: "" };
                } else if (
                  event.target.value === "1" &&
                  groupForm.maxMembers === "2"
                ) {
                  return { ...groupForm, maxMembers: "" };
                } else if (event.target.value === "1") {
                  return { ...groupForm, maxMembers: "2" };
                } else {
                  return { ...groupForm, maxMembers: event.target.value };
                }
              });
            }}
            value={groupForm.maxMembers === 0 ? "" : groupForm.maxMembers}
            error={
              groupForm.maxMembers < groupForm.groupMembers.length &&
              groupForm.maxMembers !== "" &&
              groupForm.maxMembers !== 0
            }
            helperText={
              groupForm.maxMembers < groupForm.groupMembers.length &&
              groupForm.maxMembers !== "" &&
              groupForm.maxMembers !== 0
                ? "Must be at least " + groupForm.groupMembers.length
                : ""
            }
          />
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Date"
                margin="normal"
                inputVariant="outlined"
                disablePast="true"
                onChange={(date) => {
                  setGroupForm((groupForm) => {
                    return { ...groupForm, date: formatISO(date) };
                  });
                }}
                value={
                  groupForm.date && groupForm.date.length === 0
                    ? null
                    : groupForm.date
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{ marginRight: "10px" }}
                error={
                  groupForm.date <= Date.now()
                }
                helperText={
                  true
                      ? String(groupForm.date < Date.now())
                      : ""
                }
              />
              <KeyboardTimePicker
                label="Time"
                margin="normal"
                inputVariant="outlined"
                disablePast="true"
                keyboardIcon={<AccessTimeIcon />}
                onChange={(date) => {
                  setGroupForm((groupForm) => {
                    return { ...groupForm, date: formatISO(date) };
                  });
                }}
                value={
                  groupForm.date && groupForm.date.length === 0
                    ? null
                    : groupForm.date
                }
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                error={
                  groupForm.date <= Date.now()
                }
                helperText={
                  groupForm.date <= Date.now()
                      ? "Date must lie in the future"
                      : ""
                }
              />
            </MuiPickersUtilsProvider>
            <IconButton
              className={classes.deleteDateIcon}
              onClick={() => {
                setGroupForm((groupForm) => {
                  return { ...groupForm, date: null };
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <TextField
            label="Location"
            className={classes.textfield}
            id="LocationField"
            type="text"
            fullWidth
            variant="outlined"
            value={groupForm.location}
            onChange={(event) => {
              setGroupForm((groupForm) => {
                return { ...groupForm, location: event.target.value };
              });
            }}
          />
          <TextField
            label="Description"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            value={groupForm.description}
            onChange={(event) => {
              setGroupForm((groupForm) => {
                return { ...groupForm, description: event.target.value };
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="inherit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}