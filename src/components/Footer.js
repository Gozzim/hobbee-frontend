import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import "../views/style.css";

const useStyles = makeStyles((theme) => ({
    footerRoot: {
        display: "flex",
        justifyContent: "center",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
    },
}));

/**
 * Footer of the app
 * @param {props} props
 */
export function Footer(props) {
    const classes = useStyles();

    return (
        <div className={classes.footerRoot}>
            <Typography variant="h6">
                <Link className={"linkDefault"} to={"/imprint"}>
                    imprint
                </Link>
                &nbsp;&nbsp; | &nbsp;&nbsp;
            </Typography>

            <Typography variant="h6">
                <Link className={"linkDefault"} to={"/tos"}>
                    Terms of Service
                </Link>
                &nbsp;&nbsp; | &nbsp;&nbsp;
            </Typography>

            <Typography variant="h6">
                <Link className={"linkDefault"} to={"/privacy"}>
                    Privacy Policy
                </Link>
            </Typography>
        </div>
    );
}
