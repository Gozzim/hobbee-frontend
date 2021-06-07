import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import MenuIcon from "@material-ui/icons/Menu";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
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
                    <LocalMoviesIcon/>
                </Link>
                <Typography
                    className={classes.title}
                    variant="h5"
                    color="inherit"
                >
                    Hobb.ee
                </Typography>
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
