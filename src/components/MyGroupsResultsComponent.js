import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { GroupComponent } from "../components/GroupComponent";
import { getMyGroups } from "../redux/reducers/groupsReducer";

export function MyGroupsResultsComponent(props) {
  const groups = useSelector((state) => {
    return state.groups.mine.map((id) => state.groups.data[id]);
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user.isLoggedIn && groups.length === 0) {
      dispatch(getMyGroups());
    }
  }, [user.isLoggedIn]);

  return groups.length > 0 ? (
    <div>
      <center>
        <h1> YOUR GROUPS </h1>
      </center>

      <Grid container spacing={2} justifyContent="center">
        {groups.map((a) => {
          return (
            <Grid item key={a._id}>
              <GroupComponent group={a} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  ) : (
    <div>
      <center>
        <h1> You dont seem to be part of any group! </h1>
      </center>
      <center>
        <p> Maybe try joining some!</p>
      </center>
    </div>
  );
}
