import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Menu,
  Divider,
  ListItem,
  Typography,
  Collapse,
} from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { Notification } from "./Notification";
import { TransitionGroup } from "react-transition-group";
import {
  readAllNotifications,
  readNotification,
} from "../redux/reducers/notificationReducer";

function NotificationMenu(props) {
  const dispatch = useDispatch();

  const onClickNotification = (link, id) => {
    props.onClose();
    dispatch(readNotification(id));
    props.history.push(link);
  };

  const onDeleteNotification = (id) => {
    dispatch(readNotification(id));
  };

  const clearNotifications = () => {
    dispatch(readAllNotifications());
    props.onClose();
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
      <TransitionGroup>
        {props.notifications.map((notification) => (
          <Collapse key={notification._id}>
            <Notification
              groupName={notification.group.groupName}
              onClickNotification={() => onClickNotification(notification.link, notification._id)}
              msgType={notification.notificationType}
              message={notification.content}
              onDeleteNotification={() => onDeleteNotification(notification._id)}
            />
          </Collapse>
        ))}
      </TransitionGroup>
      <Divider key="divider" />
      <ListItem button onClick={clearNotifications}>
        <Typography component="span" align="right" variant="body2">
          Mark all as read
        </Typography>
      </ListItem>
    </Menu>
  );
}

NotificationMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.object,
  open: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
};

export default connect()(withRouter(NotificationMenu));
