import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import AvatarEditor from "react-avatar-editor";
import ImageIcon from "@material-ui/icons/Image";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PublishIcon from "@material-ui/icons/Publish";

import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Grid,
  IconButton,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { getFileUrl, uploadRequest } from "../../services/FileService";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  deleteDateIcon: {
    width: "60px",
    height: "60px",
    marginLeft: "10px",
    marginTop: "14px",
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: 0,
  },
}))(Tooltip);

const examplePics = [
  "60ec51d7e0edf15bb9e1993a",
  "60ec52095fd7f45c7aaf7909",
  "60ec5220db5ec95c854a253d",
];

export function CustomizeGroup(props) {
  const classes = useStyles();
  const fileInput = React.useRef();
  const [temporaryImage, setTemporaryImage] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const [fileUploadError, setFileUploadError] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const avatarEditor = React.useRef();

  const resetTemporaryImage = () => {
    fileInput.current.value = null;
    setTemporaryImage(null);
  };

  const handleClose = () => {
    resetTemporaryImage();
  };

  const handleSave = () => {
    if (isUploading || !avatarEditor.current) return;

    setIsUploading(true);
    try {
      const image = avatarEditor.current.getImage();
      image.toBlob(async (blob) => {
        const response = await uploadRequest(blob);

        props.setGroupForm((groupForm) => {
          return { ...groupForm, pic: response.data.id };
        });
        setIsUploading(false);
        resetTemporaryImage();
      }, "image/png");
    } catch (error) {
      setFileUploadError("The file is not supported");
      setIsUploading(false);
      resetTemporaryImage();
    }
  };

  return (
    <div>
      <Typography
        variant={"h3"}
        align="center"
        style={{ fontWeight: "bold", marginBottom: "40px" }}
      >
        CUSTOMIZE
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} style={{ marginBottom: "20px" }}>
          <Dialog open={temporaryImage !== null} onClose={handleClose}>
            <DialogContent>
              <AvatarEditor
                image={temporaryImage}
                scale={scale}
                width={300}
                height={225}
                border={50}
                color={[0, 0, 0, 0.6]}
                rotate={0}
                ref={avatarEditor}
              />
              <Slider
                min={0.1}
                max={5}
                step={0.1}
                value={scale}
                onChange={(_event, value) => {
                  setScale(value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                color="primary"
                autoFocus
                disabled={isUploading}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          {props.groupForm.pic ? (
            <Button
              onClick={() => {
                fileInput.current.click();
              }}
            >
              <img
                width={300}
                height={225}
                src={getFileUrl(props.groupForm.pic)}
              />
            </Button>
          ) : (
            <Button
              className={"customizegroup-ButtonCard"}
              onClick={() => {
                fileInput.current.click();
              }}
            >
              <div>
                {props.groupForm.pic ? null : (
                  <>
                    <div className={"imageIcon"}>
                      <ImageIcon color={"disabled"} fontSize={"inherit"} />
                    </div>
                    <Typography
                      className={"selectImageText"}
                      color={"textSecondary"}
                      align={"center"}
                      variant={"h6"}
                    >
                      Upload image
                    </Typography>
                  </>
                )}
              </div>
            </Button>
          )}
          <input
            type={"file"}
            className={"customizegroup-file"}
            ref={fileInput}
            onChange={async (event) => {
              props.setTouched((touched) => {
                return { ...touched, pic: true };
              });

              const file = event.target.files[0];
              if (file.size > 500 * 1024) {
                setFileUploadError(
                  "The file size has to be smaller than 500 KB"
                );
                return;
              }
              const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
              if (!allowedFileTypes.includes(file.type)) {
                setFileUploadError(
                  "The file has to be of type jpg, jpeg or png"
                );
                return;
              }
              setFileUploadError("");
              const reader = new FileReader();

              reader.addEventListener(
                "load",
                function () {
                  // convert image file to base64 string
                  setTemporaryImage(reader.result);
                },
                false
              );

              if (file) {
                reader.readAsDataURL(file);
              }
            }}
            accept={".jpg, .jpeg, .png"}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant={"h6"} style={{ marginTop: "20px" }}>
                Upload or choose a profile picture:
                <IconButton
                  onClick={() => {
                    fileInput.current.click();
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  <PublishIcon />
                </IconButton>
              </Typography>
              <div>
                {props.groupForm.pic === "" && props.touched.pic ? (
                  <FormHelperText error>
                    You need to upload or to select a picture
                  </FormHelperText>
                ) : null}
                {fileUploadError ? (
                  <FormHelperText error>{fileUploadError}</FormHelperText>
                ) : null}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", marginLeft: "-8px" }}>
                {examplePics.map((id) => {
                  return (
                    <div key={id}>
                      <Button
                        onClick={() => {
                          props.setTouched((touched) => {
                            return { ...touched, pic: true };
                          });
                          props.setGroupForm((groupForm) => {
                            return { ...groupForm, pic: id };
                          });
                          fileInput.current.value = "";
                          setFileUploadError("");
                        }}
                      >
                        <img width={130} height={95} src={getFileUrl(id)} />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant={"h6"} style={{ marginTop: "12px" }}>
            Limit the number of participants:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="standard-number"
            type="number"
            placeholder={"unlimited"}
            variant="outlined"
            onChange={(event) => {
              props.setGroupForm((groupForm) => {
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
            value={props.groupForm.maxMembers}
          />
        </Grid>
        <Grid item xs={6} style={{ marginTop: "24px" }}>
          <Typography variant={"h6"}>Set a time and date:</Typography>
        </Grid>
        <Grid item xs={6}>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                format={"dd.MM.yyyy"}
                disablePast
                inputVariant="outlined"
                style={{ marginRight: "10px" }}
                onChange={(date) => {
                  props.setTouched((touched) => {
                    return { ...touched, date: true };
                  });
                  if (date instanceof Date && !isNaN(date)) {
                    props.setGroupForm((groupForm) => {
                      return {
                        ...groupForm,
                        date: date.toISOString(),
                      };
                    });
                  }
                }}
                value={props.groupForm.date}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                keyboardIcon={<ScheduleIcon />}
                margin="normal"
                format={"HH:mm"}
                inputVariant="outlined"
                onChange={(date) => {
                  props.setTouched((touched) => {
                    return { ...touched, date: true };
                  });
                  if (date instanceof Date && !isNaN(date)) {
                    props.setGroupForm((groupForm) => {
                      return {
                        ...groupForm,
                        date: date.toISOString(),
                      };
                    });
                  }
                }}
                error={
                  props.touched.date &&
                  props.groupForm.date &&
                  props.groupForm.date <= new Date().toISOString()
                }
                helperText={
                  props.touched.date &&
                  props.groupForm.date &&
                  props.groupForm.date <= new Date().toISOString()
                    ? "Must lie in the future"
                    : ""
                }
                value={props.groupForm.date}
              />
              <CustomTooltip title="Reset date">
                <IconButton
                  al
                  className={classes.deleteDateIcon}
                  onClick={() => {
                    props.setGroupForm((groupForm) => {
                      return { ...groupForm, date: null };
                    });
                  }}
                  disabled={!props.groupForm.date}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </CustomTooltip>
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "12px" }}>
          <Typography variant={"h6"}>Choose a specific location:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="e.g. TUMStammgelände, Arcisstr. 21 80333"
            id="TitleField"
            type="text"
            className=""
            fullWidth
            variant="outlined"
            onChange={(event) => {
              props.setGroupForm((groupForm) => {
                return { ...groupForm, location: event.target.value };
              });
            }}
          />
        </Grid>
      </Grid>
      <Typography className={"creategroup-padding"} variant={"h6"}>
        Give a short description of the planned activity:
      </Typography>
      <TextField
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        style={{ marginBottom: "30px" }}
        onChange={(event) => {
          props.setGroupForm((groupForm) => {
            return { ...groupForm, description: event.target.value };
          });
        }}
      />
    </div>
  );
}
