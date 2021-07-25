import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { HOBBEE_YELLOW } from "../shared/Constants";
import { isValidUsername} from "../validators/UserDataValidator";
import { AvatarUploadComponent } from "./AvatarUploadComponent";
import { updateMeRequest } from "../services/UserService";
import { updateUser } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { TagComponent } from "./TagComponent";
import { TagAutocomplete } from "./TagAutocomplete";

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
  deleteGroupButton: {
    //marginLeft: "10px",
    marginTop: "30px",
    marginBottom: "30px",
    backgroundColor: "#ff6347",
    borderStyle: "solid",
    borderWidth: "4px",
    borderColor: "#ff5233",
    color: "black",
    "&:hover": {
      borderColor: "#e6e6e6",
    },
  },
  updateButton: {
    backgroundColor: HOBBEE_YELLOW,
    color: "black",
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    color: "black",
  },
}));

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
  hobbies: false,
  avatar: false,
  date: false,
};

export function EditUserDialogComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [userForm, setUserForm] = React.useState(props.user);
  const [touched, setTouched] = React.useState(initialTouchedState);
  const [selectedHobby, setSelectedHobby] = useState(null);


  const onChangeTagInput = (event, hobbyTag) => {
    setTouched((touched) => {
      return { ...touched, hobbies: true };
    });
    if (!userForm.hobbies.includes(hobbyTag._id)) {
      try {
        setUserForm((userForm) => {
          return { ...userForm, hobbies: [...userForm.hobbies, hobbyTag._id] };
        });
        setSelectedHobby(null);
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  const handleOpen = () => {
    setUserForm(props.user);
    setTouched(initialTouchedState);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (
      isValidUsername(userForm.username)
    ) {
      try {
        const resp = await updateMeRequest(userForm);
        console.log(userForm)
        dispatch(updateUser(userForm));
        console.log(resp);
        props.setUser(resp.data);
        handleClose();
      } catch (e) {
        console.log(e.message);
        handleClose();
      }
    } else {
      setTouched((touched) => {
        return {
          username: true,
          city: true,
          hobbies: true,
          avatar: true,
        };
      });
    }
  };



  return (
    <div>
      <div style={{ position: "relative" }}>
        <CustomTooltip title="Edit User">
          <IconButton
            onClick={handleOpen}
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
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>

        <DialogContent>
          <AvatarUploadComponent
            userForm={userForm}
            setUserForm={setUserForm}
            touched={touched}
            setTouched={setTouched}
          />
          <TextField
            label="Username"
            className={classes.textfield}
            required
            fullWidth
            variant="outlined"
            //size="small"
            onChange={(event) => {
              setTouched((touched) => {
                return { ...touched, username: true };
              });
              setUserForm((userForm) => {
                return { ...userForm, username: event.target.value };
              });
            }}
            value={userForm.username}
            error={touched.username && !isValidUsername(userForm.username)}
            helperText={
              touched.username && !isValidUsername(userForm.username)
                ? "Invalid User Name"
                : ""
            }
          />
          <TextField
            label="City"
            className={classes.textfield}
            required //TODO IS THIS REQUIRED?
            fullWidth
            variant="outlined"
            //size="small"
            onChange={(event) => {
              setTouched((touched) => {
                return { ...touched, city: true };
              });
              setUserForm((userForm) => {
                return { ...userForm, city: event.target.value };
              });
            }}
            value={userForm.city}
            error={touched.city && userForm.city === ""}
            helperText={
              touched.city && userForm.city === "" ? "Invalid City" : ""
            }
          />

          <TagAutocomplete
            onChange={onChangeTagInput}
            value={selectedHobby}
            error={touched.hobbies && userForm.hobbies.length === 0}
            helperText={
              touched.hobbies && userForm.hobbies.length === 0
                ? "You need at least two hobbies"
                : ""
            }
          />
          <div className={"creategroup-tags"}>
            {userForm.hobbies.map((x) => {
              return (
                <div style={{ marginRight: "10px", marginBottom: "5px" }}>
                  <TagComponent
                    id={x}
                    key={x}
                    onDelete={() => {
                      setTouched((touched) => {
                        return { ...touched, hobbies: true };
                      });
                      setUserForm((userForm) => {
                        return {
                          ...userForm,
                          hobbies: userForm.hobbies.filter((hobby) => x !== hobby),
                        };
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            color="inherit"
            className={classes.updateButton}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
