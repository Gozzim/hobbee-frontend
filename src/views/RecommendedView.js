import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedGroups } from "../redux/reducers/groupsReducer";
import { SearchBar } from "../components/Search/SearchBar";
import { SearchResults } from "../components/Search/SearchResults";
import { useSearch } from "../hooks/useSearch";
import { RequireLoggedIn } from "../components/RequireLoggedIn";

export function RecommendedView() {
  const groups = useSelector((state) => {
    return state.groups.recommended.map((id) => state.groups.data[id]);
  });
  const search = useSearch({ groups });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user.isLoggedIn && groups.length === 0) {
      dispatch(getRecommendedGroups());
    }
  }, [user.isLoggedIn]);

  return (
    <div>
      <SearchBar search={search} />
      <SearchResults search={search} title="RECOMMENDED FOR YOU" />
    </div>
  );
}
