import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import PremiumIcon from "@material-ui/icons/FavoriteOutlined";
import { connect, useDispatch, useSelector } from "react-redux";

import UserMenu from "./UserMenu";
import NotificationMenu from "./Notifications/NotificationMenu";
import HobbeeIcon from "../assets/hobbee_white.svg";
import { NotificationBell } from "./Notifications/NotificationBell";
import {
  BUTTON_YELLOW,
  HOBBEE_ORANGE,
} from "../shared/Constants";
import { getFileUrl } from "../services/FileService";
import { fetchNotifications } from "../redux/reducers/notificationReducer";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    backgroundColor: HOBBEE_ORANGE,
  },
  leftNav: {
    display: "flex",
    alignItems: "center",
  },
  navButton: {
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "black",
    },
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
  },
  createGroupButton: {
    color: "black",
    backgroundColor: BUTTON_YELLOW,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
  },
  drawer: {
    backgroundColor: "#ffe57f", //color 50% lighter than #FFCC00
    height: "100%",
  },
}));

/**
 * Navigation bar of the app
 * @param {props} props
 */
function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });
  const notifications = useSelector((state) => {
    return state.notification;
  });

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  const [drawerState, setDrawerState] = useState(false);

  const useFullWidthNavigation = useMediaQuery("(min-width:1114px)");

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, props.location, user.isLoggedIn])

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftNav}>
          {useFullWidthNavigation ? null : (
            <>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setDrawerState(true);
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"left"}
                open={drawerState}
                onClose={() => {
                  setDrawerState(false);
                }}
              >
                <div className={classes.drawer}>
                  <List>
                    <ListItem button>
                      <Link className={"linkDefault"} to={"/recommended"}>
                        <ListItemText primary={"Recommended"} />
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link className={"linkDefault"} to={"/in-my-area"}>
                        <ListItemText primary={"In my area"} />
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link className={"linkDefault"} to={"/my-groups"}>
                        <ListItemText primary={"My groups"} />
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link className={"linkDefault"} to={"/create-group"}>
                        <ListItemText primary={"Create group"} />
                      </Link>
                    </ListItem>
                  </List>
                </div>
              </Drawer>
            </>
          )}

          <Link className={"linkDefault"} to={"/"}>
            <img src={HobbeeIcon} height={55} alt="hobb.ee logo" />
          </Link>
        </div>

        <div>
          {useFullWidthNavigation ? (
            <>
              <Link className={"linkDefault"} to={"/recommended"}>
                <Button className={classes.navButton} type="button">
                  RECOMMENDED
                </Button>
              </Link>
              <Link className={"linkDefault"} to={"/in-my-area"}>
                <Button className={classes.navButton} type="button">
                  IN MY AREA
                </Button>
              </Link>
              {user.isLoggedIn && (
                <Link className={"linkDefault"} to={"/my-groups"}>
                  <Button className={classes.navButton} type="button">
                    MY GROUPS
                  </Button>
                </Link>
              )}
              <Link className={"linkDefault"} to={"/create-group"}>
                <Button className={classes.createGroupButton} type="button">
                  CREATE GROUP
                </Button>
              </Link>
            </>
          ) : null}
          <Link className={"linkDefault"} to={"/premium"}>
            <IconButton color="inherit">
              <PremiumIcon />
            </IconButton>
          </Link>
          {user.isLoggedIn && (
            <>
              <NotificationBell
                clickAnchorSet={(event) =>
                  setNotificationMenuAnchor(event.currentTarget)
                }
                notificationCount={notifications.length}
              />
              <NotificationMenu
                open={Boolean(notificationMenuAnchor)}
                anchor={notificationMenuAnchor}
                onClose={() => setNotificationMenuAnchor(null)}
                notifications={notifications}
              />
            </>
          )}

          <IconButton
            onClick={(event) => setUserMenuAnchor(event.currentTarget)}
            color="inherit"
          >
            {user.isLoggedIn ? (
              <Avatar>
                {user.user.avatar
                  ? <img alt="user" width={50} height={50} src={getFileUrl(user.user.avatar)} />
                  : user.user.username
                  ? user.user.username[0]
                  : "🍯"}
              </Avatar>
            ) : (
              <AccountCircleIcon />
            )}
          </IconButton>
          <UserMenu
            open={Boolean(userMenuAnchor)}
            anchor={userMenuAnchor}
            onClose={() => setUserMenuAnchor(null)}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default connect()(withRouter(Header))