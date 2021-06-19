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
} from "@material-ui/core";

const marks = [
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
  },
  {
    value: 11,
  },
  {
    value: 12,
  },
  {
    value: 13,
  },
  {
    value: 14,
  },
  {
    value: 15,
  },
  {
    value: 16,
  },
  {
    value: 17,
  },
  {
    value: 18,
  },
  {
    value: 19,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 40,
  },
  {
    value: 50,
    label: 50,
  },
  {
    value: 60,
  },
  {
    value: 70,
  },
  {
    value: 80,
  },
  {
    value: 90,
  },
  {
    value: 100, // als unlimited
    label: "unlimited",
  },
];

export function CustomizeGroupView(props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-07-25T21:11:54")
  );

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
          <Grid item xs={12}>
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
              <Canvas
              // ref="canvasWrapper"
              // crop={crop}
              // source={source}s
              // angle={angle}
              // width={canvasWidth}
              // height={canvasHeight}
              >
                <FilePicker hasFile={hasFile} onChange={onFileChange} />
              </Canvas>
            </Darkroom>
          </Grid>

          <Grid item xs={6} className={"border"}>
            <Typography>Limit the number of participants:</Typography>
          </Grid>
          <Grid item xs={6} className={"border"}>
            <Typography id="discrete-slider" gutterBottom></Typography>
            <Slider
              defaultValue={100}
              //getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={null}
              marks={marks}
              min={2}
              max={100}
              valueLabelFormat={(x) => {
                if (x === 100) {
                  return "∞";
                } else {
                  return x;
                }
              }}
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
                //  value={selectedDate}
                value
                //   onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                //  value={selectedDate}
                onChange={handleDateChange}
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
          />
        </Grid>
      </div>
    </div>
  );
}
