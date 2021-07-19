import React from "react";
import { Link } from "react-router-dom";
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
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import UserMenu from "./UserMenu";
import NotificationMenu from "./NotificationMenu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import PremiumIcon from "@material-ui/icons/FavoriteOutlined";
import HobbeeIcon from "../assets/hobbee_white.svg";
import { useSelector } from "react-redux";
import { NotificationBell } from "./NotificationBell";
import { HOBBEE_ORANGE } from "../shared/Constants";

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
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "#32210B",
    },
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
  },
  createGroupButton: {
    color: "#32210B",
    backgroundColor: "#FFCC00",
    "&:hover": {
      backgroundColor: "#1CE9E3",
      color: "#32210B",
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
export function Header(props) {
  const classes = useStyles();
  const user = useSelector((state) => {
    return state.user;
  });
  const notifications = useSelector((state) => {
    return state.notification;
  });

  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] =
    React.useState(null);
  const [drawerState, setDrawerState] = React.useState(false);

  const useFullWidthNavigation = useMediaQuery("(min-width:1114px)");

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
              /*TODO: RenderUserAvatarFunction*/
              <Avatar>
                {user.user.avatar
                  ? "🐝"
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
