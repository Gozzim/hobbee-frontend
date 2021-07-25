import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Tooltip, IconButton } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab";

import { HOBBEE_YELLOW } from "../../shared/Constants";
import { isValidUsername } from "../../validators/UserDataValidator";
import { AvatarUploadComponent } from "./AvatarUploadComponent";
import { isUsernameAvailable, updateMeRequest } from "../../services/UserService";
import { updateUser } from "../../redux/reducers/userReducer";
import { TagComponent } from "../Tag/TagComponent";
import { TagAutocomplete } from "../Tag/TagAutocomplete";

const useStyles = makeStyles(() => ({
  textfield: {
    marginBottom: "20px",
  },
  updateButton: {
    backgroundColor: HOBBEE_YELLOW,
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

  const [open, setOpen] = useState(false);
  const [userForm, setUserForm] = useState(props.user);
  const [touched, setTouched] = useState(initialTouchedState);
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const [usernameError, setUsernameError] = useState(null);

  const onChangeTagInput = (event, hobbyTag) => {
    setTouched((touched) => {
      return { ...touched, hobbies: true };
    });
    if (!userForm.hobbies.includes(hobbyTag._id)) {
      try {
        setUserForm((userForm) => {
          return { ...userForm, hobbies: [...userForm.hobbies, hobbyTag._id] };
        });
      } catch (e) {
        console.log(e.message);
      }
    }
    setInputValue("");
    setSelectedHobby(null);
  };

  const onChangeUsername = async (event) => {
    setTouched((touched) => {
      return { ...touched, username: true };
    });
    setUserForm((userForm) => {
      return { ...userForm, username: event.target.value };
    });
    const usernameUsedResp = await isUsernameAvailable(event.target.value);

    if (!isValidUsername(event.target.value)) {
      setUsernameError("Invalid username");
    } else if (
      !usernameUsedResp.isUsernameAvailable &&
      event.target.value !== props.user.username
    ) {
      setUsernameError("Username already in use");
    } else {
      setUsernameError("");
    }
  };

  const handleOpen = () => {
    setUserForm(props.user);
    setTouched(initialTouchedState);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (isValidUsername(userForm.username)) {
      try {
        const resp = await updateMeRequest(userForm);
        dispatch(updateUser(userForm));
        props.setUser(resp.data);
        handleClose();
      } catch (e) {
        handleClose();
      }
    } else {
      setTouched(() => {
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
        <CustomTooltip key="edit" title="Edit User">
          <IconButton
            onClick={handleOpen}
            style={{ position: "absolute", transform: "translateY(-12px)" }}
          >
            <EditIcon />
          </IconButton>
        </CustomTooltip>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="edit-user">
        <DialogTitle id="edit-user">Edit User</DialogTitle>

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
            onChange={onChangeUsername}
            value={userForm.username}
            error={!!usernameError}
            helperText={usernameError}
          />
          <TextField
            label="City"
            className={classes.textfield}
            required
            fullWidth
            variant="outlined"
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
            helperText={touched.city && !userForm.city ? "Invalid City" : ""}
          />

          <TagAutocomplete
            inputValue={inputValue}
            onInputChange={(e, v) => {
              setInputValue(v);
            }}
            onChange={onChangeTagInput}
            value={selectedHobby}
            error={touched.hobbies && userForm.hobbies.length === 0}
            helperText={
              touched.hobbies && userForm.hobbies.length === 0
                ? "You need at least two hobbies"
                : ""
            }
            filterSelectedOptions
            filterOptions={createFilterOptions({
              matchFrom: "start",
              stringify: (option) =>
                !userForm.hobbies.includes(option._id) ? option.title : "",
            })}
          />
          <div className={"creategroup-tags"}>
            {userForm.hobbies.map((x, i) => {
              return (
                <div style={{ marginRight: "10px", marginBottom: "5px" }} key={i} >
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
                          hobbies: userForm.hobbies.filter(
                            (hobby) => x !== hobby
                          ),
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
