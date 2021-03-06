import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsInMyArea } from "../../redux/reducers/groupsReducer";
import { SearchBar } from "../../components/Search/SearchBar";
import { SearchResults } from "../../components/Search/SearchResults";
import { useSearch } from "../../hooks/useSearch";

export function InMyAreaView(props) {
  const groups = useSelector((state) => {
    return state.groups.inMyArea.map((id) => state.groups.data[id]);
  });
  const search = useSearch({ groups });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getGroupsInMyArea());
    }
  }, [user.isLoggedIn, props.location, dispatch]);

  return (
    <div>
      <SearchBar search={search} />
      <SearchResults search={search} title="GROUPS IN MY AREA" />
    </div>
  );
}
