import React from "react";
import PropTypes from "prop-types";
import { Badge, IconButton } from "@material-ui/core";
import NotificationIcon from "@material-ui/icons/Notifications";

export function NotificationBell(props) {
  return (
    <IconButton onClick={props.clickAnchorSet} color="inherit">
      <Badge badgeContent={props.notificationCount || 0} color="secondary">
        <NotificationIcon />
      </Badge>
    </IconButton>
  );
}

NotificationBell.propTypes = {
  clickAnchorSet: PropTypes.func.isRequired,
  notificationCount: PropTypes.number,
};
