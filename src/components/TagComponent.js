import React from "react";
import Chip from "@material-ui/core/Chip";
import { useTags } from "../hooks/useTags";

export function TagComponent(props) {
  const hobbies = useTags();
  const index = hobbies.findIndex((x) => {
    return x._id === props.id;
  });
  const colors = ["orange", "yellow", "blue"];
  const colorindex = index % colors.length;
  const color = colors[colorindex];

  return (
    <div>
      <Chip
        label={hobbies[index].title}
        onDelete={props.onDelete}
        className={color}
      />
    </div>
  );
}