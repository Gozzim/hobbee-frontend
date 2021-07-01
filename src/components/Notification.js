import React from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import AssistantIcon from "@material-ui/icons/Assistant";
import ChatIcon from "@material-ui/icons/Chat";
import InfoIcon from "@material-ui/icons/Info";

const NotificationTypes = {
  CHAT: "Chat",
  REMINDER: "Reminder",
  FEEDBACK: "Feedback",
};

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

  const getNotificationIcon = (msgType) => {
    switch (msgType) {
      case NotificationTypes.CHAT:
        return <ChatIcon />;
      case NotificationTypes.REMINDER:
        return <AlarmIcon />;
      case NotificationTypes.FEEDBACK:
        return <AssistantIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <ListItem key={props.msgId} button dense className={classes.notification}>
      <ListItemIcon>{getNotificationIcon(props.msgType)}</ListItemIcon>
      <ListItemText primary={props.groupName} secondary={props.message} />
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
