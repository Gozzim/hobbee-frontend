import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Divider, Menu, MenuItem } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/userReducer";

const useStyles = makeStyles((theme) => ({
  firstMenuitem: {
    display: "block !important",
    minWidth: "200px",
  },
  menuitem: {
    minWidth: "200px",
    marginTop: theme.spacing(1),
  },
}));

/**
 * Menu for user managment
 * @param {props} props
 */
function UserMenu(props) {
  const classes = useStyles();

  const user = useSelector((state) => {
    return state.user;
  });

  const onClickLogin = () => {
    // close this menu
    props.onClose();
    // navigate to the login page
    props.history.push("/login");
  };

  const onClickRegister = () => {
    props.onClose();
    props.history.push("/register");
  };

  const onClickLogout = () => {
    // trigger redux logout action
    props.dispatch(logout());
    // close this menu
    props.onClose();
    // navigate to the home page
    props.history.push("/");
  };

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
      {user.user
        ? [
            <MenuItem
              key="user"
              className={classes.firstMenuitem}
              onClick={() => {
                props.onClose();
                props.history.push("/profile");
              }}
            >
              Signed in as {user.user.username.length < 10 ? "" : <br />}
              <b>{user.user.username}</b>
            </MenuItem>,
            <Divider key={"divider1"} />,
            <MenuItem
              key={"profile"}
              className={classes.menuitem}
              onClick={() => {
                props.onClose();
                props.history.push("/profile");
              }}
            >
              My profile
            </MenuItem>,
            <MenuItem
              key={"settings"}
              className={classes.menuitem}
              onClick={() => {
                props.onClose();
                props.history.push("/account-settings");
              }}
            >
              Account Settings
            </MenuItem>,
            <Divider key={"divider2"} />,
            <MenuItem
              key="logout"
              onClick={onClickLogout}
              className={classes.menuitem}
            >
              Sign out
            </MenuItem>,
          ]
        : [
            <MenuItem
              key="login"
              onClick={onClickLogin}
              className={classes.menuitem}
            >
              Login
            </MenuItem>,
            <MenuItem
              key="register"
              onClick={onClickRegister}
              className={classes.menuitem}
            >
              Register
            </MenuItem>,
          ]}
    </Menu>
  );
}

// attributes of props and their type
UserMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.object,
  open: PropTypes.bool.isRequired,
};

export default connect()(withRouter(UserMenu));
