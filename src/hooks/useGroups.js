import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchGroups } from "../redux/reducers/groupsReducer";

export function useGroups() {
  const groups = useSelector((state) => state.groups.items);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (groups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  return groups;
}