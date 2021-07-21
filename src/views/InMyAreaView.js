import React from "react";
import { SearchBarComponent } from "../components/SeachBarComponent";
import { GroupResultsComponentDemo } from "../components/GroupResultsComponentDemo";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedGroups } from "../redux/reducers/groupsReducer";

export function InMyAreaView() {
  const groups = useSelector((state) => {
    return state.groups.recommended.map((id) => state.groups.data[id]);
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user.isLoggedIn && groups.length === 0) {
      // TODO: use other endpoint
      dispatch(getRecommendedGroups());
    }
  }, [user.isLoggedIn]);

  return <SearchBarComponent groups={groups} title="GROUPS IN YOUR AREA" />;
}
