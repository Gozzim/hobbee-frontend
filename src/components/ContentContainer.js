import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { AdBanner } from "./AdBanner";

const useStyles = makeStyles((theme) => ({
  contentContainerRoot: {
    height: "calc(100vh - 64px)",
    display: "flex",
    alignItems: "center",
  },
  scrollContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    overflow: "scroll",
    overflowX: "hidden",
  },
  wrapper: {
    paddingTop: "40px",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  main: {
    flexGrow: 1,
  },
  spacer: {
    width: "300px",
    flexShrink: 1,
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
      <div className={classes.scrollContainer}>
        <AdBanner />
        <Container className={classes.wrapper} maxWidth="md">
          <main className={classes.main}>{children}</main>
          {footer}
        </Container>
        <AdBanner />
      </div>
    </div>
  );
}
