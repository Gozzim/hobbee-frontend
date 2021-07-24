import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { logout } from "../redux/reducers/userReducer";

const useStyles = makeStyles((theme) => ({
  firstMenuitem: {
    display: "flex",
    minWidth: "200px",
  },
  menuitem: {
    display: "flex",
    minWidth: "200px",
    marginTop: theme.spacing(1),
  },
  avatar: {
    marginRight: theme.spacing(1),
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
    // store current site
    try {
      sessionStorage.setItem("last_visited", props.location.pathname);
    } catch (e) {
      // sessionStorage not supported
    }
    // close this menu
    props.onClose();
    // navigate to the login page
    props.history.push("/login");
  };

  const onClickLogout = () => {
    // trigger redux logout action
    props.dispatch(logout());
    // close this menu
    props.onClose();
    // navigate to the home page
    props.history.push("/");
  };
  console.log(user.user);
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
                return props.history.push("/profile");
              }}
            >
              Signed in as&nbsp;<b>{user.user.username}</b>
            </MenuItem>,
            <Divider />,
            <MenuItem
              className={classes.menuitem}
              onClick={() => {
                return props.history.push("/profile");
              }}
            >
              My profile
            </MenuItem>,
            <MenuItem className={classes.menuitem}>
              {user.user.premium.active ? "My premium" : "Get premium"}
            </MenuItem>,
            <Divider />,
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
              <VerifiedUserIcon className={classes.avatar} />
              Login
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
