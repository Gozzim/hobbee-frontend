import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetch } from "../redux/reducers/tagsReducer";

export function useTags() {
  const hobbies = useSelector((state) => state.tags.items);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (hobbies.length === 0) {
      dispatch(fetch());
    }
  }, []);

  return hobbies;
}
