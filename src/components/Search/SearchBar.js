import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Tune } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TagAutocomplete } from "../TagAutocomplete";
import { TagComponent } from "../TagComponent";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(5),
    flex: 1,
  },
  filterContainer: {
    padding: "20px !important",
  },
}));

export function SearchBar(props) {
  const { search } = props;
  const classes = useStyles();
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const onChangeTagInput = (event, hobbyTag) => {
    if (hobbyTag && !search.filters.tags.includes(hobbyTag._id)) {
      try {
        search.setFilters((filters) => {
          return { ...filters, tags: [...filters.tags, hobbyTag._id] };
        });
        setSelectedHobby(null);
      } catch (e) {
        console.log(e.message);
      }
    }
    setInputValue("");
    setSelectedHobby(null);
  };

  const searchString = "What do you like doing?";

  return (
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
            value={search.searchValue}
            onChange={(event) => {
              search.setSearchValue(event.target.value);
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
                  search.setFilters((filters) => {
                    return { ...filters, city: event.target.value };
                  });
                }}
                value={search.filters.city}
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
                    search.setFilters((filters) => {
                      return {
                        ...filters,
                        from:
                          date instanceof Date && !isNaN(date)
                            ? date.toISOString()
                            : null,
                      };
                    });
                  }}
                  value={search.filters.from}
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
                    search.setFilters((filters) => {
                      return {
                        ...filters,
                        to:
                          date instanceof Date && !isNaN(date)
                            ? date.toISOString()
                            : null,
                      };
                    });
                  }}
                  value={search.filters.to}
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
                      search.setFilters((filters) => {
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
                    value={search.filters.participants}
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
                      search.setFilters((filters) => {
                        if (parseInt(event.target.value, 10) < 1) {
                          return { ...filters, slots: "" };
                        } else {
                          return { ...filters, slots: event.target.value };
                        }
                      });
                    }}
                    value={search.filters.slots}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={search.filters.online}
                        onChange={(event) => {
                          search.setFilters((filters) => {
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
                        checked={search.filters.offline}
                        onChange={(event) => {
                          search.setFilters((filters) => {
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
                inputValue={inputValue}
                onInputChange={(e, v) => {
                  setInputValue(v);
                }}
                filterOptions={(options) => {
                  return options.filter((option) =>
                      !search.filters.tags.includes(option._id)

                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <div className={"creategroup-tags"}>
                {search.filters.tags.map((x) => {
                  return (
                    <div style={{ marginRight: "10px", marginBottom: "5px" }}>
                      <TagComponent
                        id={x}
                        key={x}
                        onDelete={() => {
                          search.setFilters((filters) => {
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
    </Grid>
  );
}
