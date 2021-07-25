import { useSelector } from "react-redux";
import React from "react";

export function useTags() {
  return useSelector((state) => state.tags.items);
}
