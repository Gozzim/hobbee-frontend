import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  contentContainerRoot: {
    flexWrap: "wrap",
    marginRight: "15%",
    marginLeft: "15%",
    height: "calc(100vh - 50px)",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    flexWrap: "nowrap",
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
}));

/**
 * For having an internal scroll container
 * @param {props} props
 */
export function ContentContainer(props) {
  const classes = useStyles();

  return (
    <div className={classes.contentContainerRoot}>
      <div className={classes.wrapper}>{props.children}</div>
    </div>
  );
}
