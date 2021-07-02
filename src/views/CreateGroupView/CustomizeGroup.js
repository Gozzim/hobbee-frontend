import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  Darkroom,
  Canvas,
  History,
  Toolbar,
  FilePicker,
  CropMenu,
} from "react-darkroom";
import ImageIcon from "@material-ui/icons/Image";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Grid,
  Slider,
  Paper,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { formatISO } from "date-fns";

export function CustomizeGroup(props) {
  const [participants, setParticipants] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-07-25T21:11:54")
  );
  const fileInput = React.useRef();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  let hasFile = false;

  function onFileChange() {}

  return (
    <div>
      <Typography variant="h3" component={"h1"} align={"center"} className={""}>
        {/* component (the semantic): how the heading is rendered; variant: how the heading looks */}
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
                        <input
                          type={"file"}
                          className={"customizegroup-file"}
                          ref={fileInput}
                          onChange={(event) => {
                            props.dispatch({
                              type: "PIC",
                              pic: event.target.value,
                            });
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
            <Typography>Upload or choose a picture:</Typography>
            <div className={"customizegroup-filename"}>
              [no file uploaded yet]
            </div>
            <div className={"customizegroup-avatare"}>
              <Avatar variant="square" className={"customizegroup-avatar"}>
                <LocalCafeIcon />
              </Avatar>
              <Avatar variant="square" className={"customizegroup-avatar"}>
                <WbSunnyIcon />
              </Avatar>
              <Avatar variant="square" className={"customizegroup-avatar"}>
                <DesktopMacIcon />
              </Avatar>
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
                if (event.target.value < 1) {
                  props.dispatch({
                    type: "NUMBER_OF_PARTICIPANTS",
                    participants: "",
                  });
                } else if (
                  event.target.value === "1" &&
                  props.state.participants === "2"
                ) {
                  props.dispatch({
                    type: "NUMBER_OF_PARTICIPANTS",
                    participants: "",
                  });
                } else if (event.target.value === "1") {
                  props.dispatch({
                    type: "NUMBER_OF_PARTICIPANTS",
                    participants: "2",
                  });
                } else {
                  props.dispatch({
                    type: "NUMBER_OF_PARTICIPANTS",
                    participants: event.target.value,
                  });
                }
              }}
              value={props.state.participants}
            />
          </Grid>
          <Grid item xs={6} className={"border"}>
            <Typography>Set a time and date:</Typography>
          </Grid>
          <Grid item xs={6} className={"border"}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                //format="MM/dd/yyyy"
                onChange={(date) => {
                  props.dispatch({ type: "DATE", date: formatISO(date) });
                }}
                value={props.state.date}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                //  value={selectedDate}
                onChange={(date) => {
                  props.dispatch({ type: "DATE", date: formatISO(date) });
                }}
                value={props.state.date}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
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
                props.dispatch({
                  type: "LOCATION",
                  location: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6} className={"border"}>
            <Typography>
              Give a short description of the planned activity:
            </Typography>
          </Grid>
          <Grid item xs={6}></Grid>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            onChange={(event) => {
              props.dispatch({
                type: "DESCRIPTION",
                description: event.target.value,
              });
            }}
          />
        </Grid>
      </div>
    </div>
  );
}
