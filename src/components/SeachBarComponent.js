import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
import { ArrowDownward, ArrowUpward, Tune } from "@material-ui/icons";
import GroupIcon from "@material-ui/icons/Group";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
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
  filterContainer: {
    padding: "20px !important",
  },
}));

function applyFilters(groups, filters) {
  console.log(filters);
  let filteredGroups = groups;

  if (filters.city) {
    const fuse = new Fuse(filteredGroups, {
      keys: ["city"],
    });
    filteredGroups = fuse.search(filters.city).map((result) => result.item);
  }

  if (filters.from) {
    const fromDate = new Date(filters.from);
    fromDate.setHours(0, 0, 0, 0);
    filteredGroups = filteredGroups.filter((group) => {
      if (!group.date) return true;
      return fromDate <= new Date(group.date);
    });
  }

  if (filters.to) {
    const toDate = new Date(filters.to);
    toDate.setHours(23, 59, 59, 999);
    filteredGroups = filteredGroups.filter((group) => {
      if (!group.date) return true;
      return toDate >= new Date(group.date);
    });
  }

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

function applySorting(groups, sortBy, ascending) {
  const sortedGroups = [...groups];

  if (sortBy === "timestamp") {
    sortedGroups.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

  if (sortBy === "date") {
    sortedGroups.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  if (sortBy === "participants") {
    sortedGroups.sort((a, b) => {
      return b.groupMembers.length - a.groupMembers.length;
    });
  }

  if (ascending) {
    sortedGroups.reverse();
  }

  return sortedGroups;
}

export function SearchBarComponent(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedHobby, setSelectedHobby] = useState(null);

  const onChangeTagInput = (event, hobbyTag) => {
    if (!filters.tags.includes(hobbyTag._id)) {
      try {
        setFilters((filters) => {
          return { ...filters, tags: [...filters.tags, hobbyTag._id] };
        });
        setSelectedHobby(null);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const fuse = new Fuse(props.groups, {
    keys: ["groupName"],
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

  const [sortBy, setSortBy] = React.useState("timestamp");
  const [ascending, setAscending] = React.useState(false);
  const groupsToShow = applySorting(
    applyFilters(filteredGroups, filters),
    sortBy,
    ascending
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            style={{
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
            }}
            component="form"
            className={classes.root}
            onSubmit={(e) => {
              e.preventDefault();
              setShowFilters(true);
            }}
          >
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
            <IconButton
              onClick={() => {
                setShowFilters((shown) => !shown);
              }}
            >
              <Tune />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.filterContainer}>
          {showFilters ? (
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <TextField
                  placeholder="e.g. Munich, Germany"
                  label="City"
                  InputProps={{
                    style: {
                      height: "32px",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    format={"dd.MM.yyyy"}
                    onChange={(date) => {
                      setFilters((filters) => {
                        return {
                          ...filters,
                          from:
                            date instanceof Date && !isNaN(date)
                              ? date.toISOString()
                              : null,
                        };
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    format={"dd.MM.yyyy"}
                    onChange={(date) => {
                      setFilters((filters) => {
                        return {
                          ...filters,
                          to:
                            date instanceof Date && !isNaN(date)
                              ? date.toISOString()
                              : null,
                        };
                      });
                    }}
                    value={filters.to}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={3}>
                    <TextField
                      id="standard-number"
                      type="number"
                      placeholder={"unlimited"}
                      label="max. Participants"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => {
                        setFilters((filters) => {
                          if (parseInt(event.target.value, 10) < 1) {
                            return { ...filters, participants: "" };
                          } else {
                            return {
                              ...filters,
                              participants: event.target.value,
                            };
                          }
                        });
                      }}
                      value={filters.participants}
                    />
                  </Grid>
                  <Grid item xs={3}>
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

                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.online}
                          onChange={(event) => {
                            setFilters((filters) => {
                              return {
                                ...filters,
                                online: event.target.checked,
                              };
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
                              return {
                                ...filters,
                                offline: event.target.checked,
                              };
                            });
                          }}
                          color="default"
                        />
                      }
                      label="Offline"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <TagAutocomplete
                  onChange={onChangeTagInput}
                  value={selectedHobby}
                />
              </Grid>
              <Grid item xs={6}>
                <div className={"creategroup-tags"}>
                  {filters.tags.map((x) => {
                    return (
                      <div style={{ marginRight: "10px", marginBottom: "5px" }}>
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
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          ) : null}
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems={"center"} justify={"flex-end"}>
            <FormControl>
              <InputLabel>Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                }}
              >
                <MenuItem value="timestamp">Creation date</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="participants">Number of participants</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={() => {
                setAscending((ascending) => !ascending);
              }}
            >
              {ascending ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Grid>

          <center>
            <h1>{props.title}</h1>
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
                  <Typography>No groups found</Typography>
                </center>
              </div>
            )}
          </center>
        </Grid>
      </Grid>
    </>
  );
}
