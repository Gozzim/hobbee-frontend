import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Button, Icon, IconButton, Toolbar, Typography} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/AccountCircle";
import PremiumIcon from "@material-ui/icons/FavoriteOutlined";
import NotificationIcon from "@material-ui/icons/NotificationsNoneOutlined";

import HobbeeIcon from "../assets/cat.png";

import KebabMenu from "./KebabMenu";

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
function Header(props) {
    const classes = useStyles();

    const [menuAnchor, setMenuAnchor] = React.useState(null);

    const onClickGithub = (event) => {
        var win = window.open(
            "https://github.com/sebischair/seba-master-movie-frontend",
            "_blank"
        );
        win.focus();
    };

    return (
        <AppBar position="sticky">
            <KebabMenu
                open={Boolean(menuAnchor)}
                anchor={menuAnchor}
                onClose={() => setMenuAnchor(null)}
            />
            <Toolbar className={classes.toolbar}>
                <IconButton
                    fontSize="large"
                    onClick={() => props.history.push("/")}
                >
                    <img src={HobbeeIcon} height={40}/>
                </IconButton>
                <Typography
                    className={classes.title}
                    variant="h5"
                    color="inherit"
                >
                    Hobb.ee
                </Typography>
                <Button
                    className={classes.navButton}
                    type="button"
                    onClick={() => props.history.push("/recommended")}
                >
                    RECOMMENDED
                </Button>
                <Button
                    className={classes.navButton}
                    type="button"
                    onClick={() => props.history.push("/in-my-area")}
                >
                    IN MY AREA
                </Button>
                <Button
                    className={classes.navButton}
                    type="button"
                    onClick={() => props.history.push("/my-groups")}
                >
                    MY GROUPS
                </Button>
                <Button
                    className={classes.navButton}
                    type="button"
                    onClick={() => props.history.push("/create-group")}
                    style={{
                        backgroundColor: "orange",
                    }}
                >
                    CREATE GROUP
                </Button>
                <IconButton onClick={() => props.history.push("/premium")} color="inherit">
                    <PremiumIcon />
                </IconButton>
                <IconButton
                    onClick={(event) => setMenuAnchor(event.currentTarget)}
                    color="inherit"
                >
                    <NotificationIcon />
                </IconButton>
                <IconButton
                    onClick={(event) => setMenuAnchor(event.currentTarget)}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(Header);
