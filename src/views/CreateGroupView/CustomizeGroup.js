import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Darkroom, Canvas } from "react-darkroom";
import ImageIcon from "@material-ui/icons/Image";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Avatar,
  FormHelperText,
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
            <Darkroom>
              {/*<Toolbar>*/}
              {/*  <button*/}
              {/*    onClick={selectFile}*/}
              {/*    data-tipsy="Select Image"*/}
              {/*    className="tipsy tipsy--s"*/}
              {/*  >*/}
              {/*    <span className="icon icon-image" />*/}
              {/*    <input*/}
              {/*      type="file"*/}
              {/*      ref="fileselect"*/}
              {/*      onChange={onFileChange}*/}
              {/*      style={{ display: "none" }}*/}
              {/*    />*/}
              {/*  </button>*/}
              {/*  <History*/}
              {/*    step={this.state.step}*/}
              {/*    length={this.state.thread.length - 1}*/}
              {/*  >*/}
              {/*    <button*/}
              {/*      action="back"*/}
              {/*      onClick={this.onUndo}*/}
              {/*      ifEmpty="disable"*/}
              {/*      data-tipsy="Undo"*/}
              {/*      className="tipsy tipsy--sw"*/}
              {/*    >*/}
              {/*      <span className="icon icon-undo2" />*/}
              {/*    </button>*/}
              {/*    <button*/}
              {/*      action="forward"*/}
              {/*     // onClick={onRedo}*/}
              {/*      ifEmpty="disable"*/}
              {/*      data-tipsy="Redo"*/}
              {/*      className="tipsy tipsy--sw"*/}
              {/*    >*/}
              {/*      <span className="icon icon-redo2" />*/}
              {/*    </button>*/}
              {/*  </History>*/}
              {/*  <button*/}
              {/*    disabled={!hasFile}*/}
              {/*    onClick={this.onRotateLeft}*/}
              {/*    data-tipsy="Rotate Left"*/}
              {/*    className="tipsy tipsy--sw"*/}
              {/*  >*/}
              {/*    <span className="icon icon-undo" />*/}
              {/*  </button>*/}
              {/*  <button*/}
              {/*    disabled={!hasFile}*/}
              {/*    onClick={this.onRotateRight}*/}
              {/*    data-tipsy="Rotate Right"*/}
              {/*    className="tipsy tipsy--sw"*/}
              {/*  >*/}
              {/*    <span className="icon icon-redo" />*/}
              {/*  </button>*/}
              {/*  <CropMenu isCropping={crop}>*/}
              {/*    <button*/}
              {/*      disabled={!hasFile}*/}
              {/*      data-showOnlyWhen="croppingIsOff"*/}
              {/*      onClick={this.onCropStart}*/}
              {/*      data-tipsy="Crop"*/}
              {/*      className="tipsy tipsy--sw"*/}
              {/*    >*/}
              {/*      <span className="icon icon-crop" />*/}
              {/*    </button>*/}
              {/*    <button*/}
              {/*      disabled={!hasFile}*/}
              {/*      data-showOnlyWhen="croppingIsOn"*/}
              {/*      style={{ color: "cyan" }}*/}
              {/*    >*/}
              {/*      <span className="icon icon-crop" />*/}
              {/*    </button>*/}
              {/*    <button*/}
              {/*      disabled={!hasFile}*/}
              {/*      data-showOnlyWhen="croppingIsOn"*/}
              {/*      onClick={this.onCropConfirm}*/}
              {/*      style={{ color: "green" }}*/}
              {/*      data-tipsy="Confirm"*/}
              {/*      className="tipsy tipsy--sw"*/}
              {/*    >*/}
              {/*      <span className="icon icon-checkmark" />*/}
              {/*    </button>*/}
              {/*    <button*/}
              {/*      disabled={!hasFile}*/}
              {/*      data-showOnlyWhen="croppingIsOn"*/}
              {/*      onClick={this.onCropCancel}*/}
              {/*      style={{ color: "red" }}*/}
              {/*      data-tipsy="Cancel"*/}
              {/*      className="tipsy tipsy--sw"*/}
              {/*    >*/}
              {/*      <span className="icon icon-cross" />*/}
              {/*    </button>*/}
              {/*  </CropMenu>*/}
              {/*  <button*/}
              {/*    disabled={!hasFile}*/}
              {/*    onClick={this.onSave}*/}
              {/*    data-tipsy="Save"*/}
              {/*    className="tipsy tipsy--sw"*/}
              {/*  >*/}
              {/*    <span className="icon icon-floppy-disk" />*/}
              {/*  </button>*/}
              {/*</Toolbar>*/}
              <Card className={"cardImage"}>
                <CardContent className={"cardImage"}>
                  <Canvas
                    // ref="canvasWrapper"
                    // crop={crop}
                    // source={source}
                    // angle={angle}
                    // width={canvasWidth}
                    // height={canvasHeight}
                    width={300}
                    height={220}
                  >
                    <Button
                      className={"customizegroup-ButtonCard"}
                      onClick={() => {
                        fileInput.current.click();
                      }}
                    >
                      <div>
                        {props.groupForm.pic ? (
                          <img src={getFileUrl(props.groupForm.pic)} />
                        ) : (
                          <>
                            <div className={"imageIcon"}>
                              <ImageIcon
                                color={"disabled"}
                                fontSize={"inherit"}
                              />
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
                        <input
                          type={"file"}
                          className={"customizegroup-file"}
                          ref={fileInput}
                          onChange={async (event) => {
                            props.setTouched((touched) => {
                              return { ...touched, pic: true };
                            });

                            const file = event.target.files[0];
                            if (file) {
                              const response = await uploadRequest(file);

                              props.setGroupForm((groupForm) => {
                                return { ...groupForm, pic: response.data.id };
                              });
                            }
                          }}
                        />
                      </div>
                    </Button>
                  </Canvas>
                </CardContent>
              </Card>
            </Darkroom>
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
