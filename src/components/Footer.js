import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";
import "../views/style.css";
import CopyrightIcon from "@material-ui/icons/Copyright";

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
function Footer(props) {
    const classes = useStyles();

    return (
        <div className={classes.footerRoot}>
            <Typography variant="h6">
                <a className={"link"}

                    href="https://www.hobb.ee/imprint"
                    target="_blank"
                    rel="noopener noreferrer"

                >
                    Imprint
                </a>
                &nbsp;&nbsp; | &nbsp;&nbsp;
            </Typography>

            <Typography variant="h6">
                <a className={"link"}
                    href="https://www.hobb.ee/tos"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Terms of Service
                </a>
                &nbsp;&nbsp; | &nbsp;&nbsp;
            </Typography>

            <Typography variant="h6">
                <a className={"link"}
                    href="https://www.hobb.ee/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Privacy Policy
                </a>
            </Typography>
        </div>
    );
}

export default Footer;
