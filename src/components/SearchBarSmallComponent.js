import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
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

export function SearchBarSmallComponent(props) {
  const classes = useStyles();
  const searchString = "What do you like doing?";

  return (
    <Paper component="form" className={classes.root}>
      <SearchIcon />
      <InputBase
        className={classes.input}
        placeholder={searchString}
        inputProps={{ "aria-label": { searchString } }}
        value={props.value}
        onChange={props.onChange}
      />
    </Paper>
  );
}
