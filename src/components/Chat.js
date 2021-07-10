import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputField: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
    display: "inline-block",
  },
  chatField: {
    backgroundColor: "lightblue",
    width: "100%",
    height: "560px",
  },
  messageButtonDiv: {
    //flex: 1,
    width: "100px",
    position: "relative",
  },
  messageButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

/**
 * For having an internal scroll container
 * @param {props} props
 */
export function Chat(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.chatField}>this will be a chat.</div>
      <div style={{ display: "flex" }}>
        <form
          className={classes.inputField}
          noValidate
          autoComplete="off"
          style={{ flex: 3 }}
        >
          <TextField
            id="outlined-basic"
            label="Send a message"
            variant="outlined"
          />
        </form>
        <div className={classes.messageButtonDiv}>
          <Button type="button" className={classes.messageButton}>
            SEND
          </Button>
        </div>
      </div>
    </div>
  );
}