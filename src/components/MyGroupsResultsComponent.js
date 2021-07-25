import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import GroupComponent from "./GroupComponent";
import { getMyGroups } from "../redux/reducers/groupsReducer";
import { useLocation } from "react-router";

export function MyGroupsResultsComponent() {
  const currentGroups = useSelector((state) => {
    return state.groups.mine
      .map((id) => state.groups.data[id])
      .filter((group) => group.date > new Date().toISOString());
  });

  const pastGroups = useSelector((state) => {
    return state.groups.mine
      .map((id) => state.groups.data[id])
      .filter((group) => group.date <= new Date().toISOString());
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getMyGroups());
    }
  }, [user.isLoggedIn, location, dispatch]);

  return currentGroups.length > 0 || pastGroups.length > 0 ? (
    <div>
      <center>
        <h1> ACTIVE GROUPS </h1>
      </center>
      {currentGroups.length === 0 ? (
        <center>
          <div>You do not have any active groups</div>
        </center>
      ) : (
        <Grid container spacing={2} justify="center">
          {currentGroups.map((a) => {
            return (
              <Grid item>
                <GroupComponent group={a} />{" "}
              </Grid>
            );
          })}
        </Grid>
      )}

      <center>
        <h1> PAST GROUPS </h1>
      </center>
      {pastGroups.length === 0 ? (
        <center>
          <div>You do not have any past groups</div>
        </center>
      ) : (
        <Grid container spacing={2} justify="center">
          {pastGroups.map((a) => {
            return (
              <Grid item>
                <GroupComponent group={a} />{" "}
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  ) : (
    <div>
      <center>
        <h1> You don't seem to be part of any groups. </h1>
      </center>
      <center>
        <h3> Try joining one or creating your own!</h3>
      </center>
    </div>
  );
}
