import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedGroups } from "../redux/reducers/groupsReducer";
import { SearchBar } from "../components/Search/SearchBar";
import { SearchResults } from "../components/Search/SearchResults";
import { useSearch } from "../hooks/useSearch";
import { RequireLoggedIn } from "../components/RequireLoggedIn";

export function RecommendedView(props) {
  const groups = useSelector((state) => {
    return state.groups.recommended.map((id) => state.groups.data[id]);
  });
  const search = useSearch({ groups });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getRecommendedGroups());
    }
  }, [user.isLoggedIn, props.location, dispatch]);

  return (
    <RequireLoggedIn>
      <SearchBar search={search} />
      <SearchResults search={search} title="RECOMMENDED FOR ME" />
    </RequireLoggedIn>
  );
}
