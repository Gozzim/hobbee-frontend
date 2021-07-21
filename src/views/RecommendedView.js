import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedGroups } from "../redux/reducers/groupsReducer";
import { SearchBarComponent } from "../components/SeachBarComponent";

export function RecommendedView() {
  const groups = useSelector((state) => {
    return state.groups.recommended.map((id) => state.groups.data[id]);
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user.isLoggedIn && groups.length === 0) {
      dispatch(getRecommendedGroups());
    }
  }, [user.isLoggedIn]);

  return <SearchBarComponent groups={groups} title="RECOMMENDED FOR YOU" />;
}
