import React from "react";
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  notification: {
    display: "flex",
    minWidth: "200px",
    "&:isRead": {
      //TODO
    },
  },
}));

export function Notification(props) {
  const classes = useStyles();

  return (
    <ListItem key={props.msgId} button dense className={classes.notification}>
      <ListItemText
          primary={props.groupName}
          secondary={props.message}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

// attributes of props and their type
Notification.propTypes = {
  msgId: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  msgType: PropTypes.string,
  message: PropTypes.string,
  read: PropTypes.bool,
};
