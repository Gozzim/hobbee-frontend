import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Icon, IconButton, Toolbar, Typography } from "@material-ui/core";
import UserMenu from "./UserMenu";
import MenuIcon from "@material-ui/icons/AccountCircle";
import PremiumIcon from "@material-ui/icons/FavoriteOutlined";
import NotificationIcon from "@material-ui/icons/NotificationsNoneOutlined";
import HobbeeIcon from "../assets/cat.png";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
    },
    navButton: {
        color: "white",
        fontSize: 17,
        marginLeft: 20,
        marginRight: 20,
    },
}));

/**
 * Navigation bar of the app
 * @param {props} props
 */
export function Header(props) {
    const classes = useStyles();

    const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);

    return (
        <AppBar position="sticky">
            <UserMenu
                open={Boolean(userMenuAnchor)}
                anchor={userMenuAnchor}
                onClose={() => setUserMenuAnchor(null)}
            />
            <Toolbar className={classes.toolbar}>
                <Link className={"linkDefault"} to={"/"}>
                    <img src={HobbeeIcon} height={40}/>
                </Link>
                <Typography
                    className={classes.title}
                    variant="h5"
                    color="inherit"
                >
                    Hobb.ee
                </Typography>
                <Link className={"linkDefault"} to={"/recommended"}>
                    <Button
                        className={classes.navButton}
                        type="button"
                    >
                        RECOMMENDED
                    </Button>
                </Link>
                <Link className={"linkDefault"} to={"/in-my-area"}>
                    <Button
                        className={classes.navButton}
                        type="button"
                    >
                        IN MY AREA
                    </Button>
                </Link>
                <Link className={"linkDefault"} to={"/my-groups"}>
                    <Button
                        className={classes.navButton}
                        type="button"
                    >
                        MY GROUPS
                    </Button>
                </Link>
                <Link className={"linkDefault"} to={"/create-group"}>
                    <Button
                        className={classes.navButton}
                        type="button"
                        style={{
                            backgroundColor: "orange",
                        }}
                    >
                        CREATE GROUP
                    </Button>
                </Link>
                <Link className={"linkDefault"} to={"/premium"}>
                    <PremiumIcon />
                </Link>
                <IconButton
                    onClick={(event) => setUserMenuAnchor(event.currentTarget)}
                    color="inherit"
                >
                    <NotificationIcon />
                </IconButton>
                <IconButton
                    onClick={(event) => setUserMenuAnchor(event.currentTarget)}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}