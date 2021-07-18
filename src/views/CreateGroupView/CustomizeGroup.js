import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import AvatarEditor from "react-avatar-editor";
import ImageIcon from "@material-ui/icons/Image";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { formatISO } from "date-fns";
import { getFileUrl, uploadRequest } from "../../services/FileService";

const examplePics = [
  "60ec51d7e0edf15bb9e1993a",
  "60ec52095fd7f45c7aaf7909",
  "60ec5220db5ec95c854a253d",
];

export function CustomizeGroup(props) {
  const fileInput = React.useRef();
  const [temporaryImage, setTemporaryImage] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const avatarEditor = React.useRef();

  const handleClose = () => {
    setTemporaryImage(null);
  };

  const handleSave = () => {
    if (avatarEditor.current) {
      const image = avatarEditor.current.getImage();
      image.toBlob(async (blob) => {
        const response = await uploadRequest(blob);

        props.setGroupForm((groupForm) => {
          return { ...groupForm, pic: response.data.id };
        });
        setTemporaryImage(null);
      }, "image/png");
    }
  };

  console.log(temporaryImage);

  return (
    <div>
      <Typography variant="h3" component={"h1"} align={"center"} className={""}>
        Customize Group
      </Typography>
      <Typography variant="h6" component={"h2"} align={"center"} className={""}>
        Add some personality
      </Typography>
      <div className={"customizegroup-grid"}>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Dialog open={temporaryImage !== null} onClose={handleClose}>
              <DialogContent>
                <AvatarEditor
                  image={temporaryImage}
                  scale={scale}
                  width={300}
                  height={220}
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
                  aria-labelledby="continuous-slider"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary" autoFocus>
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
                  height={220}
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
                    // <img src={getFileUrl(props.groupForm.pic)} />
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
                        Select image
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
            <Typography>Upload or choose a profile picture:</Typography>
            <div className={"customizegroup-filename"}>
              {props.groupForm.pic === "" && props.touched.pic ? (
                <FormHelperText error>
                  You need to upload or to select a picture
                </FormHelperText>
              ) : null}
            </div>
            <div className={"customizegroup-avatare"}>
              {examplePics.map((id) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      props.setGroupForm((groupForm) => {
                        return { ...groupForm, pic: id };
                      });
                      fileInput.current.value = "";
                    }}
                  >
                    <Avatar
                      variant="square"
                      className={
                        props.groupForm.pic === id
                          ? "customizegroup-avatar selectedAvatar"
                          : "customizegroup-avatar"
                      }
                      src={getFileUrl(id)}
                      onChange={() => {
                        props.setTouched((touched) => {
                          return { ...touched, pic: true };
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </Grid>

          <Grid item xs={6} className={"border"}>
            <Typography>Limit the number of participants:</Typography>
          </Grid>

          {/*<Grid item xs={6} className={"border"}>*/}
          {/*  <Typography id="discrete-slider" gutterBottom></Typography>*/}
          {/*  <Slider*/}
          {/*    defaultValue={100}*/}
          {/*    //getAriaValueText={valuetext}*/}
          {/*    aria-labelledby="discrete-slider"*/}
          {/*    valueLabelDisplay="auto"*/}
          {/*    step={null}*/}
          {/*    marks={marks}*/}
          {/*    min={2}*/}
          {/*    max={100}*/}
          {/*    valueLabelFormat={(x) => {*/}
          {/*      if (x === 100) {*/}
          {/*        return "∞";*/}
          {/*      } else {*/}
          {/*        return x;*/}
          {/*      }*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</Grid>*/}
          <Grid item xs={6} className={"border"}>
            <TextField
              id="standard-number"
              type="number"
              placeholder={"unlimited"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                props.setGroupForm((groupForm) => {
                  if (parseInt(event.target.value, 10) < 1) {
                    return { ...groupForm, participants: "" };
                  } else if (
                    event.target.value === "1" &&
                    props.groupForm.participants === "2"
                  ) {
                    return { ...groupForm, participants: "" };
                  } else if (event.target.value === "1") {
                    return { ...groupForm, participants: "2" };
                  } else {
                    return { ...groupForm, participants: event.target.value };
                  }
                });
              }}
              value={props.groupForm.participants}
            />
          </Grid>
          <Grid item xs={6} className={"border"}>
            <Typography>Set a time and date:</Typography>
          </Grid>
          <Grid item xs={6} className={"border"}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                onChange={(date) => {
                  props.setGroupForm((groupForm) => {
                    return { ...groupForm, date: formatISO(date) };
                  });
                }}
                value={props.groupForm.date}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                onChange={(date) => {
                  props.setGroupForm((groupForm) => {
                    return { ...groupForm, date: formatISO(date) };
                  });
                }}
                value={props.groupForm.date}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
            <div>
              <Button
                className={"creategroup-nodatebutton"}
                onClick={() => {
                  props.setGroupForm((groupForm) => {
                    return { ...groupForm, date: null };
                  });
                }}
              >
                No date
              </Button>
            </div>
          </Grid>
          <Grid item xs={6} className={"border"}>
            <Typography>Choose a specific location:</Typography>
          </Grid>
          <Grid item xs={6} className={"border"}>
            <TextField
              label="e.g. Arcisstr.21, 80333 Munich"
              id="TitleField"
              type="text"
              className=""
              fullWidth
              onChange={(event) => {
                props.setGroupForm((groupForm) => {
                  return { ...groupForm, location: event.target.value };
                });
              }}
            />
          </Grid>
          <Grid item xs={6} className={"border"}>
            <Typography>
              Give a short description of the planned activity:
            </Typography>
          </Grid>
          <Grid item xs={6} />
          <TextField
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            onChange={(event) => {
              props.setGroupForm((groupForm) => {
                return { ...groupForm, description: event.target.value };
              });
            }}
          />
        </Grid>
      </div>
    </div>
  );
}
