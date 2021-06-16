import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchNotifications } from "../redux/reducers/notificationReducer";

const NotificationTypes = {
    CHAT : "Chat",
    REMINDER : "Reminder",
    FEEDBACK : "Feedback"
}

const useStyles = makeStyles((theme) => ({
    menuitem: {
        display: "flex",
        minWidth: "200px",
    },
}));

/**
 * Menu for user managment
 * @param {props} props
 */
function NotificationMenu(props) {
    const classes = useStyles();

    useEffect(() => {
        props.dispatch(fetchNotifications())
    });

    let unread = () => this.props.notifications.filter(
        (userNotification) => userNotification.unread
    );

    const onClickNotification = (notificationType) => {
        props.onClose();

        switch (notificationType) {
            case NotificationTypes.CHAT:
            case NotificationTypes.REMINDER:
                let groupId = 0; // dummy
                props.history.push("/group-page/" + groupId);
                break;
            case NotificationTypes.FEEDBACK:
                /*
                startFeedback(feedbackHash);
                 */
                break;
            default:
                break;
        }
    };

    function renderNotificationItems(notifications) {
        if (notifications.length === 0) {
            return (
                <div>
                    <p>You have no new notifications.</p>
                </div>
            )
        }
        return (
            <MenuItem
                key="notification"
                className={classes.menuitem}
            >

            </MenuItem>
        );
    }

    return (
        <Menu
            open={props.open}
            anchorEl={props.anchor}
            onClose={props.onClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            {renderNotificationItems(fetchNotifications())}
            <Divider key="divider" />
            <MenuItem className={classes.menuitem}>
                Mark as read
            </MenuItem>
        </Menu>
    );
}

// attributes of props and their type
NotificationMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    anchor: PropTypes.element,
    open: PropTypes.bool.isRequired,
};

export default connect()(withRouter(NotificationMenu));
