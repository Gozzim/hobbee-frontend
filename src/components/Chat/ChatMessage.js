import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  messageBox: {
    borderRadius: "5px",
    height: "auto",
    margin: "5px",
    display: "inline-block",
    padding: "10px",
    maxWidth: "300px",
  },
  systemMessage: {
    backgroundColor: "#99E8E1",
    borderRadius: "5px",
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
    color: "#666666",
  },
}));

export function ChatMessage(props) {
  const isSystemMessage = props.isSystemMessage;
  const classes = useStyles();
  const sender = props.name;
  const message = props.message;
  const timestamp = props.time;

  if (isSystemMessage) {
    return (
      <div className={classes.systemMessageContainer}>
        <div className={classes.systemMessage}>
          <Typography style={{ fontSize: "14px" }}>{message}</Typography>
        </div>
      </div>
    );
  } else {
    if (props.isCurrentUser) {
      return (
        <div className={classes.right}>
          <div
            className={classes.messageBox}
            style={{ backgroundColor: "#FFe680" }}
          >
            <div
              className={"linkDefault"}
              style={{ textAlign: "left", wordWrap: "break-word" }}
            >
              <Typography style={{ fontSize: "16px" }}>{message}</Typography>
            </div>
            <div className={classes.timestampDiv}>
              <Typography style={{ fontSize: "12px" }}>{timestamp}</Typography>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.left}>
          <div
            className={classes.messageBox}
            style={{ backgroundColor: "#FFF3C2" }}
          >
            <Link className={"linkDefault"} to={"/user/" + sender}>
              <div className={classes.nameDiv}>
                <Typography style={{ fontSize: "14px" }}>{sender}</Typography>
              </div>
            </Link>
            <div
              className={"linkDefault"}
              style={{ textAlign: "left", wordWrap: "break-word" }}
            >
              <Typography style={{ fontSize: "16px" }}>{message}</Typography>
            </div>
            <div className={classes.timestampDiv}>
              <Typography style={{ fontSize: "12px" }}>{timestamp}</Typography>
            </div>
          </div>
        </div>
      );
    }
  }
}
