import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageBox: {
    backgroundColor: "white",
    borderRadius: "5px",
    height: "auto",
    //width: "100px",
    margin: "5px",
    display: "inline-block",
    padding: "10px",
  },
  systemMessage: {
    backgroundColor: "#99E8E1",
    borderRadius: "5px",
    //height: "auto",
    margin: "5px",
    display: "inline-block",
    padding: "5px",
    textAlign: "center",
  },
  systemMessageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto",
    fontSize: "14px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  left: {
    marginLeft: "20px",
    marginRight: "100px",
    textAlign: "left",
  },
  right: {
    marginLeft: "100px",
    marginRight: "20px",
    textAlign: "right",
  },
  nameDiv: {
    fontFamily: "Roboto",
    fontSize: "14px",
    textAlign: "left",
  },
  timestampDiv: {
    fontFamily: "Roboto",
    fontSize: "12px",
    color: "#888888",
  },
}));

export function ChatMessage(props) {
  const isSystemMessage = props.isSystemMessage;
  const classes = useStyles();
  const sender = props.name;
  const message = props.message;
  const timestamp = props.time;
  const isCurrentUser = props.isCurrentUser;

  if (isSystemMessage) {
    return (
      <div className={classes.systemMessageContainer}>
        <div className={classes.systemMessage}>{message}</div>
      </div>
    );
  } else {
    return (
      <div className={isCurrentUser ? classes.right : classes.left}>
        <div className={classes.messageBox}>
          {!isCurrentUser ? (
            <div className={classes.nameDiv}>{sender}</div>
          ) : null}
          <div className={"linkDefault"} style={{ textAlign: "left" }}>
            {message}
          </div>
          <div className={classes.timestampDiv}>{timestamp}</div>
        </div>
      </div>
    );
  }
}
