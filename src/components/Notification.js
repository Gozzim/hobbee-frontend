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
import { readNotification } from "../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

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
    <ListItem button dense className={classes.notification} onClick={() => props.onClickNotification(props.msgType, props.link)}>
      <ListItemIcon>{getNotificationIcon(props.msgType)}</ListItemIcon>
      <ListItemText primary={props.groupName} secondary={props.message} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => dispatch(readNotification(props.id))}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

// attributes of props and their type
Notification.propTypes = {
  id: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  onClickNotification: PropTypes.func.isRequired,
  link: PropTypes.string,
  msgType: PropTypes.string,
  message: PropTypes.string,
  read: PropTypes.bool,
};
