import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Menu, Divider, ListItem, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { Notification } from "./Notification";

/*
 * TODO:
 *  - Mark as read button functionality
 *  - Mark all as read button functionality
 */

const NotificationTypes = {
  CHAT: "Chat",
  REMINDER: "Reminder",
  FEEDBACK: "Feedback",
};

/**
 * Menu for user managment
 * @param {props} props
 */
function NotificationMenu(props) {
  const onClickNotification = (msgType, linkId) => {
    props.onClose();

    switch (msgType) {
      case NotificationTypes.CHAT:
      case NotificationTypes.REMINDER:
        props.history.push("/group/" + linkId);
        break;
      case NotificationTypes.FEEDBACK:
        //TODO
        props.history.push("/feedback/" + linkId);
        break;
      default:
        break;
    }
  };

  return (
    <Menu
      anchorEl={props.anchor}
      open={props.open}
      onClose={props.onClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {props.notifications.map((notification) => (
        <Notification
          key={notification._id}
          id={notification._id}
          groupName={notification.group.groupName}
          onClickNotification={onClickNotification}
          link={(notification.notificationType === "Chat" || notification.notificationType === "Reminder") ? notification.group._id : "testId"}
          msgType={notification.notificationType}
          message={notification.content}
        />
      ))}
      <Divider key="divider" />
      <ListItem button>
        <Typography component="span" align="right" variant="body2">
          Mark all as read
        </Typography>
      </ListItem>
    </Menu>
  );
}

// attributes of props and their type
NotificationMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.object,
  open: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
};

export default connect()(withRouter(NotificationMenu));
