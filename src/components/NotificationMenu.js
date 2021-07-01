import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Menu,
  Divider,
  ListItem,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Notification } from "./Notification";

/*
 * TODO:
 *  - Map group to name
 *  - Mark as read button functionality
 *  - Mark all as read button functionality
 *  - Notification Type indicator
 *  - Notification Routing
 *  - Filtering by read and unread
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

  const onClickNotification = (notificationType) => { //TODO
    props.onClose();

    switch (notificationType) {
      case NotificationTypes.CHAT:
      case NotificationTypes.REMINDER:
        let groupId = 0; // dummy
        props.history.push("/group-page/" + groupId);
        break;
      case NotificationTypes.FEEDBACK:
        //TODO
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
              msgId={notification._id}
              groupName={/*"TODO"*/notification.group}
              msgType={notification.notificationType}
              message={notification.content}
              read={notification.read}
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
