import React from "react";
import Chip from "@material-ui/core/Chip";
import { useTags } from "../hooks/useTags";

export function TagComponent(props) {
  const hobbies = useTags();
  const index = hobbies.findIndex((x) => {
    return x.title === props.title;
  });
  const colors = ["orange", "yellow", "blue"];
  const colorindex = index % colors.length;
  const color = colors[colorindex];

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div>
      <Chip label={props.title} onDelete={handleDelete} className={color} />
    </div>
  );
}
