import React from "react";
import { Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import { HOBBEE_ORANGE } from "../shared/Constants";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    right: 20,
    bottom: 20,
    position: "absolute",
    backgroundColor: HOBBEE_ORANGE,
    "&:hover": {
      backgroundColor: HOBBEE_ORANGE,
    },
  },
}));

export function Editable(props) {
  const classes = useStyles();
  const [editing, setEditing] = React.useState(false);

  return (
    <>
      {editing ? (
        <Fab
          className={classes.button}
          color="primary"
          aria-label="add"
          onClick={() => {
            // TODO: handle save
            setEditing(false);
          }}
        >
          <CheckIcon />
        </Fab>
      ) : (
        <Fab
          className={classes.button}
          color="primary"
          aria-label="add"
          onClick={() => {
            setEditing(true);
          }}
        >
          <EditIcon />
        </Fab>
      )}
      {props.render(editing)}
    </>
  );
}
