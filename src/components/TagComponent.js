import Chip from "@material-ui/core/Chip";
import React from "react";
import { useSelector } from "react-redux";

export function TagComponent(props) {
  const hobbies = useSelector((state) => state.tags.items);
  const index = hobbies.findIndex((x) => {
    return x._id === props.id;
  });
  const colors = ["orange", "yellow", "blue"];
  const color = colors[1];

  if (index < 0) {
    return null;
  }

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
