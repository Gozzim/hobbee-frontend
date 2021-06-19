import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
    value: 1,
  },
  {
    value: 2,
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
  },
];

export function CustomizeGroupView(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-07-25T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <div>CUSTOMIZE GROUP</div>
      <div>ADD SOME PERSONALITY</div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div>Limit the number of participants:</div>
        </Grid>
        <Grid item xs={6}>
            <Typography id="discrete-slider" gutterBottom>
            </Typography>
            <Slider
              defaultValue={100}
              //getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={null}
              marks={marks}
              min={2}
              max={100}
            />
        </Grid>
        <Grid item xs={6}>
          <div>Set a time and date:</div>
        </Grid>
        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                //format="MM/dd/yyyy"
              //  value={selectedDate}
                value
              //   onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
              //  value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

        </Grid>
          <Grid item xs={6}>
            <div>Choose a specific location:</div>
          </Grid>
          <Grid item xs={6}>

          </Grid>

      </Grid>




    </div>
  );
}