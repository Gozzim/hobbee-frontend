import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Badge, IconButton } from "@material-ui/core";
import NotificationIcon from "@material-ui/icons/Notifications";
import { useDispatch } from "react-redux";
import { fetchNotifications } from "../redux/reducers/notificationReducer";

export function NotificationBell(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  return (
    <IconButton onClick={props.clickAnchorSet} color="inherit">
      <Badge badgeContent={props.notificationCount || 0} color="secondary">
        <NotificationIcon />
      </Badge>
    </IconButton>
  );
}

// attributes of props and their type
NotificationBell.propTypes = {
  clickAnchorSet: PropTypes.func.isRequired,
  notificationCount: PropTypes.number,
};
