import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import {FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {TagComponent} from "../components/TagComponent";
import {TagAutocomplete} from "../components/TagAutocomplete";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,

  },
  small: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',

  },
  input: {
    marginLeft: theme.spacing(5),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 0,
    margin: 4,
  },
}));

export function SearchBarComponent(props) {

  const classes = useStyles()

  const [autocompleteValue, setAutocompleteValue] = React.useState(null);

  const searchString = "What do you like doing?"

  const [tags, setTags] = React.useState([]);
  //const city = "Munich"
  //const time = new Date("July 19, 2021 13:37")
  //const currentMembers = 5
  //const maxMembers = 7
  //const groupImage = image

  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Paper component="form" className={classes.root}>

          <SearchIcon/>
          <InputBase
            className={classes.input}
            placeholder={searchString}
            inputProps={{'aria-label': {searchString}}}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained" className={classes.iconButton}>
          Go
        </Button>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="e.g. Munich, Germany"
          className=""
          // required={true}
          fullWidth
          variant="outlined"
          size="small"
          //margin="normal"
          onChange={(event) => {
            props.dispatch({
              type: "SET_CITY",
              city: event.target.value,
            });
          }}
          // value={props.state.city}
        />

      </Grid>

      <Grid item xs={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            //margin="normal"
            label="From"
            onChange={(date) => {
              props.setSearchForm((searchForm) => {
                // return { ...searchForm, date: formatISO(date) };
              });
            }}
            //value={props.searchForm.date}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="To"
            //margin="normal"
            onChange={(date) => {
              props.setSearchForm((searchForm) => {
                // return { ...searchForm, date: formatISO(date) };
              });
            }}
            //value={props.searchForm.date}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item>

        <Typography>
        </Typography>

        <TextField
          id="standard-number"
          type="number"
          placeholder={"Unlimited"}
          label="Participants"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            props.setSearchForm((SearchForm) => {
              if (parseInt(event.target.value, 10) < 1) {
                return {...SearchForm, participants: ""};
              } else if (
                event.target.value === "1" &&
                props.SearchForm.participants === "2"
              ) {
                return {...SearchForm, participants: ""};
              } else if (event.target.value === "1") {
                return {...SearchForm, participants: "2"};
              } else {
                return {...SearchForm, participants: event.target.value};
              }
            });
          }}
          //value={props.groupForm.participants}
        />
      </Grid>
      <Grid item>
        <TextField
          id="standard-number"
          type="number"
          label="Free Slots"
          placeholder={"2"}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            props.setSearchForm((SearchForm) => {
              if (parseInt(event.target.value, 10) < 1) {
                return {...SearchForm, participants: ""};
              } else if (
                event.target.value === "1" &&
                props.SearchForm.participants === "2"
              ) {
                return {...SearchForm, participants: ""};
              } else if (event.target.value === "1") {
                return {...SearchForm, participants: "2"};
              } else {
                return {...SearchForm, participants: event.target.value};
              }
            });
          }}
          //value={props.SearchForm.participants}
        />
      </Grid>

      <Grid item>
        <RadioGroup
          className={"creategroup-radios"}
          onChange={(event) => {
            props.setGroupForm((SearchForm) => {
              return {...SearchForm, onOffline: event.target.value};
            });
          }}
          // value={props.SearchForm.onOffline}
        >
          <FormControlLabel value="online" control={<Radio/>} label="Online"/>
          <FormControlLabel
            value="offline"
            control={<Radio/>}
            label="Offline"
          />
        </RadioGroup>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>

          <Grid item>
            <TagAutocomplete
              onChange={(tags) => {
                setTags(tags);
              }}
              value={tags}
            />
          </Grid>

          {tags.map((x) => {
            return <Grid item> <TagComponent id={x} key={x}/> </Grid>
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
