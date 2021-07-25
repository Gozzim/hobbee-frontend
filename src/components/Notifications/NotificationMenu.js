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
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { connect, useDispatch } from "react-redux";
import { Notification } from "./Notification";
import { TransitionGroup } from "react-transition-group";
import {
  readAllNotifications,
  readNotification,
} from "../../redux/reducers/notificationReducer";

function NotificationMenu(props) {
  const dispatch = useDispatch();

  const onClickNotification = (link, id) => {
    props.onClose();
    dispatch(readNotification(id));
    props.history.push(link);
  };

  const onDeleteNotification = (id) => {
    if (props.notifications.length <= 1) {
      props.onClose();
    }
    dispatch(readNotification(id));
  };

  const clearNotifications = () => {
    props.onClose();
    dispatch(readAllNotifications());
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
      {props.notifications.length > 0 ? (<div style={{minWidth: 300, maxWidth: 500, maxHeight: 360}}>
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
      </div>) : (
          <div style={{minWidth: 300, maxWidth: 500, minHeight: 200, maxHeight: 400,
            display: "flex",
          }}>
            <ListItem style={{
              justifyContent: "center",
              flexDirection: 'column',
            }}>
          <NotificationsOffIcon color={"disabled"} style={{
            fontSize: 40,
          }}/>
              <Typography style={{color: "grey", marginTop: 5}}>No notifications</Typography>
        </ListItem>
          </div>)}
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
