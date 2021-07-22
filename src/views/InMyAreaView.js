import React from "react";
import { SearchBarComponent } from "../components/SeachBarComponent";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsInMyArea } from "../redux/reducers/groupsReducer";

export function InMyAreaView() {
  const groups = useSelector((state) => {
    return state.groups.inMyArea.map((id) => state.groups.data[id]);
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user.isLoggedIn && groups.length === 0) {
      dispatch(getGroupsInMyArea());
    }
  }, [user.isLoggedIn]);

  return <SearchBarComponent groups={groups} title="GROUPS IN YOUR AREA" />;
}
