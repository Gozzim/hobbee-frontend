import React from "react";
import { useGroups } from "./useGroups";

export function useGroup(id) {
  const groups = useGroups();
  return groups.find((group) => group._id === id);
}
