import Chip from "@material-ui/core/Chip";
import React from "react";
import { useSelector } from "react-redux";
import { HOBBEE_YELLOW } from "../../shared/Constants";

export function TagComponent(props) {
  const hobbies = useSelector((state) => state.tags.items);
  const index = hobbies.findIndex((x) => {
    return x._id === props.id;
  });

  if (index < 0) {
    return null;
  }

  return (
    <div>
      <Chip
        label={hobbies[index].title}
        onDelete={props.onDelete}
        style={{background: HOBBEE_YELLOW}}
      />
    </div>
  );
}
