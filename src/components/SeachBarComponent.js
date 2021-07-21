import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TagComponent } from "../components/TagComponent";
import { TagAutocomplete } from "../components/TagAutocomplete";
import Fuse from "fuse.js";
import { GroupComponent } from "./GroupComponent";
import { formatISO } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
  },
  small: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
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

function applyFilters(groups, filters) {
  console.log(filters);
  let filteredGroups = groups;

  if (filters.city) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.city === filters.city;
    });
  }

  //   from: null,
  //   to: null,

  if (filters.participants) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.groupMembers.length <= parseInt(filters.participants, 10);
    });
  }

  if (filters.slots) {
    filteredGroups = filteredGroups.filter((group) => {
      if (group.participants === 0) return true;
      const freeSlots = group.participants - group.groupMembers.length;
      return freeSlots >= parseInt(filters.slots, 10);
    });
  }

  if (filters.online && !filters.offline) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.onOffline === "online" || group.onOffline === "both";
    });
  }

  if (!filters.online && filters.offline) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.onOffline === "offline" || group.onOffline === "both";
    });
  }

  if (filters.tags.length > 0) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.tags.some((tag) => filters.tags.includes(tag));
    });
  }

  return filteredGroups;
}

export function SearchBarComponent(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState("");

  const fuse = new Fuse(props.groups, {
    keys: ["groupName", "city"],
  });
  const filteredGroups = searchValue
    ? fuse.search(searchValue).map((result) => result.item)
    : props.groups;
  //const [autocompleteValue, setAutocompleteValue] = React.useState(null);

  const searchString = "What do you like doing?";
  //const city = "Munich"
  //const time = new Date("July 19, 2021 13:37")
  //const currentMembers = 5
  //const maxMembers = 7
  //const groupImage = image
  const [filters, setFilters] = React.useState({
    city: "",
    from: null,
    to: null,
    participants: "",
    slots: "",
    online: true,
    offline: true,
    tags: [],
  });

  const groupsToShow = applyFilters(filteredGroups, filters);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Paper component="form" className={classes.root}>
          <SearchIcon />
          <InputBase
            className={classes.input}
            placeholder={searchString}
            inputProps={{ "aria-label": { searchString } }}
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Button
          type="submit"
          variant="contained"
          className={classes.iconButton}
        >
          Go
        </Button>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="e.g. Munich, Germany"
          className=""
          required
          fullWidth
          variant="outlined"
          size="small"
          onChange={(event) => {
            setFilters((filters) => {
              return { ...filters, city: event.target.value };
            });
          }}
          value={filters.city}
        />
      </Grid>

      <Grid item xs={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="From"
            onChange={(date) => {
              setFilters((filters) => {
                return { ...filters, from: formatISO(date) };
              });
            }}
            value={filters.from}
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
            onChange={(date) => {
              setFilters((filters) => {
                return { ...filters, to: formatISO(date) };
              });
            }}
            value={filters.to}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item>
        <Typography></Typography>

        <TextField
          id="standard-number"
          type="number"
          placeholder={"unlimited"}
          label="Participants"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setFilters((filters) => {
              if (parseInt(event.target.value, 10) < 1) {
                return { ...filters, participants: "" };
              } else {
                return { ...filters, participants: event.target.value };
              }
            });
          }}
          value={filters.participants}
        />
      </Grid>
      <Grid item>
        <TextField
          id="standard-number"
          type="number"
          label="Free Slots"
          placeholder={"any"}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            setFilters((filters) => {
              if (parseInt(event.target.value, 10) < 1) {
                return { ...filters, slots: "" };
              } else {
                return { ...filters, slots: event.target.value };
              }
            });
          }}
          value={filters.slots}
        />
      </Grid>

      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.online}
              onChange={(event) => {
                setFilters((filters) => {
                  return { ...filters, online: event.target.checked };
                });
              }}
              color="default"
            />
          }
          label="Online"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={filters.offline}
              onChange={(event) => {
                setFilters((filters) => {
                  return { ...filters, offline: event.target.checked };
                });
              }}
              color="default"
            />
          }
          label="Offline"
        />

        <TagAutocomplete
          onChange={(tags) => {
            setFilters((filters) => {
              return { ...filters, tags };
            });
          }}
          value={filters.tags}
        />

        <div className={"creategroup-tags"}>
          {filters.tags.map((x) => {
            return (
              <TagComponent
                id={x}
                key={x}
                onDelete={() => {
                  setFilters((filters) => {
                    return {
                      ...filters,
                      tags: filters.tags.filter((tag) => {
                        return x !== tag;
                      }),
                    };
                  });
                }}
              />
            );
          })}
        </div>
      </Grid>

      <Grid item>
        <center>
          <h1>RECOMMENDED FOR YOU</h1>
          {groupsToShow.length > 0 ? (
            <div>
              <Grid container spacing={2} justify="center">
                {groupsToShow.map((group) => {
                  return (
                    <Grid item key={group._id}>
                      <GroupComponent group={group} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          ) : (
            <div>
              <center>
                <h1>You dont seem to be part of any group!</h1>
              </center>
              <center>
                <p>Maybe try joining some!</p>
              </center>
            </div>
          )}
        </center>
      </Grid>
    </Grid>
  );
}
