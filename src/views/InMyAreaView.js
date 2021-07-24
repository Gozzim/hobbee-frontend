import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsInMyArea } from "../redux/reducers/groupsReducer";
import { SearchBar } from "../components/Search/SearchBar";
import { SearchResults } from "../components/Search/SearchResults";
import { useSearch } from "../hooks/useSearch";

export function InMyAreaView() {
  const groups = useSelector((state) => {
    return state.groups.inMyArea.map((id) => state.groups.data[id]);
  });
  const search = useSearch({ groups });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user.isLoggedIn && groups.length === 0) {
      dispatch(getGroupsInMyArea());
    }
  }, [user.isLoggedIn]);

  return (
    <>
      <SearchBar search={search} />
      <SearchResults search={search} title="GROUPS IN YOUR AREA" />
    </>
  );
}
