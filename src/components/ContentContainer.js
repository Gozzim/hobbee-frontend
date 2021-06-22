import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contentContainerRoot: {
    height: "calc(100vh - 64px)",
    paddingTop: "40px",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
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
      <Container className={classes.wrapper} maxWidth="md">
        <main className={classes.main}>{children}</main>
        {footer}
      </Container>
    </div>
  );
}