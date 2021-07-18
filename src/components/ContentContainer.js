import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import ad1 from "../assets/banner1.png";
import { AdBanner } from "./AdBanner";

const useStyles = makeStyles((theme) => ({
  contentContainerRoot: {
    paddingRight: "300px",
    height: "calc(100vh - 64px)",
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    paddingTop: "40px",
    height: "100%",
    width: "100%",
    display: "flex",
    overflow: "scroll",
    flexDirection: "column",
  },
  main: {
    flexGrow: 1,
  },
}));

/**
 * For having an internal scroll container
 * @param {props} props
 */
export function ContentContainer(props) {
  const classes = useStyles();

  const { children, footer } = props;

  return (
    <div className={classes.contentContainerRoot}>
      <AdBanner />
      <Container className={classes.wrapper} maxWidth="md">
        <main className={classes.main}>{children}</main>
        {footer}
      </Container>
    </div>
  );
}
