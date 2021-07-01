import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Menu,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

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
      <ListItem key={"Noty"} button dense >
        <ListItemText
            primary={"Hobb.ee Meetup"}
            secondary={"Hobb.ee is awesome!"}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
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
