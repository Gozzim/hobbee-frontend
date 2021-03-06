import * as React from "react";
import equal from "fast-deep-equal";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { getGroups } from "../redux/reducers/groupsReducer";

const initialFiltersState = {
  city: "",
  from: null,
  to: null,
  participants: "",
  slots: "",
  online: true,
  offline: true,
  tags: [],
};

export function useSearch(args) {
  const { groups, initialGroupsOnPage = 15 } = args;

  // Fetch all groups
  const allGroups = useSelector((state) => {
    return state.groups.all.map((id) => state.groups.data[id]);
  });
  const dispatch = useDispatch();
  const location = useLocation();
  React.useEffect(() => {
    dispatch(getGroups());
  }, [location, dispatch]);

  let results = [...allGroups];

  // Search
  const [searchValue, setSearchValue] = React.useState("");
  const fuse = new Fuse(results, {
    keys: ["groupName"],
  });
  if (searchValue) {
    results = fuse.search(searchValue).map((result) => result.item);
  }

  // Filters
  const [filters, setFilters] = React.useState(initialFiltersState);
  const hasFilters = !equal(filters, initialFiltersState);
  results = applyFilters(results, filters);

  // Decide whether to search all groups
  if (!searchValue && !hasFilters) {
    results = [...groups];
  }

  // Filter expired and deleted groups
  results = results.filter((group) => {
    const expired = group.date && group.date < new Date().toISOString();
    return !group.deleted && !expired;
  });

  // Sorting
  const [sortBy, setSortBy] = React.useState("timestamp");
  const [ascending, setAscending] = React.useState(false);
  results = applySorting(results, sortBy, ascending);

  // Pagination
  const [page, setPage] = React.useState(1);
  const [groupsOnPage, setGroupsOnPage] = React.useState(initialGroupsOnPage);
  const pages = Math.max(1, Math.ceil(results.length / groupsOnPage));
  results = results.slice(groupsOnPage * (page - 1), groupsOnPage * page);

  return {
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    ascending,
    setAscending,
    page,
    setPage,
    groupsOnPage,
    setGroupsOnPage,
    results,
    hasFilters,
    pages,
  };
}

function applyFilters(groups, filters) {
  let filteredGroups = groups;

  if (filters.city) {
    const fuse = new Fuse(filteredGroups, {
      keys: ["city"],
    });
    filteredGroups = fuse.search(filters.city).map((result) => result.item);
  }

  if (filters.from) {
    const fromDate = new Date(filters.from);
    fromDate.setHours(0, 0, 0, 0);
    filteredGroups = filteredGroups.filter((group) => {
      if (!group.date) return true;
      return fromDate <= new Date(group.date);
    });
  }

  if (filters.to) {
    const toDate = new Date(filters.to);
    toDate.setHours(23, 59, 59, 999);
    filteredGroups = filteredGroups.filter((group) => {
      if (!group.date) return true;
      return toDate >= new Date(group.date);
    });
  }

  if (filters.participants) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.groupMembers.length <= parseInt(filters.participants, 10);
    });
  }

  if (filters.slots) {
    filteredGroups = filteredGroups.filter((group) => {
      if (group.participants === 0) return true;
      const freeSlots = group.participants - group.groupMembers.length;
      return freeSlots >= parseInt(filters.slots, 10);
    });
  }

  if (filters.online && !filters.offline) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.onOffline === "online" || group.onOffline === "both";
    });
  }

  if (!filters.online && filters.offline) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.onOffline === "offline" || group.onOffline === "both";
    });
  }

  if (filters.tags.length > 0) {
    filteredGroups = filteredGroups.filter((group) => {
      return group.tags.some((tag) => filters.tags.includes(tag));
    });
  }

  return filteredGroups;
}

function applySorting(groups, sortBy, ascending) {
  const sortedGroups = [...groups];

  if (sortBy === "timestamp") {
    sortedGroups.sort((a, b) => {
      const aPremium = a.groupOwner.premium.active;
      const bPremium = b.groupOwner.premium.active;
      if (aPremium && !bPremium) {
        return -1;
      }
      if (!aPremium && bPremium) {
        return 1;
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

  if (sortBy === "date") {
    sortedGroups.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  if (sortBy === "participants") {
    sortedGroups.sort((a, b) => {
      return b.groupMembers.length - a.groupMembers.length;
    });
  }

  if (ascending) {
    sortedGroups.reverse();
  }

  return sortedGroups;
}
