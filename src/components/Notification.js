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
    <ListItem
      button
      dense
      className={classes.notification}
      onClick={props.onClickNotification}
    >
      <ListItemIcon>{getNotificationIcon(props.msgType)}</ListItemIcon>
      <ListItemText primary={props.groupName} secondary={props.message} secondaryTypographyProps={{noWrap: true}}/>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={props.onDeleteNotification}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

// attributes of props and their type
Notification.propTypes = {
  groupName: PropTypes.string.isRequired,
  onClickNotification: PropTypes.func.isRequired,
  onDeleteNotification: PropTypes.func.isRequired,
  msgType: PropTypes.string,
  message: PropTypes.string,
};
