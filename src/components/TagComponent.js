import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import hobbies from "../assets/hobbies.json";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // justifyContent: "center",
    // flexWrap: "wrap",
    // "& > *": {
    //   margin: theme.spacing(0.5),
    // },
  },
}));
export function TagComponent(props) {
  const classes = useStyles();
  const index = hobbies.findIndex((x) => {
    return x.title === props.title;
  });
  const colors = ["orange", "yellow", "blue"];
  const colorindex = index % colors.length;
  const color = colors[colorindex];
  const hideDeleteIcon = props.hideDeleteIcon;

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div className={classes.root}>
      <Chip label={props.title} onDelete={hideDeleteIcon ? undefined : handleDelete} className={color} />
    </div>
  );
}
