import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import GroupComponent from "./GroupComponent";
import { getMyGroups } from "../redux/reducers/groupsReducer";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginTop: "40px",
    marginBottom: "25px",
  },
}));

export function MyGroupsResultsComponent(props) {
  const classes = useStyles();

  const currentGroups = useSelector((state) => {
    return state.groups.mine
      .map((id) => state.groups.data[id])
      .filter((group) => !group.date || group.date > new Date().toISOString());
  });

  const pastGroups = useSelector((state) => {
    return state.groups.mine
      .map((id) => state.groups.data[id])
      .filter((group) => group.date <= new Date().toISOString());
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user.isLoggedIn && currentGroups.length === 0) {
      dispatch(getMyGroups());
    }
  }, [user.isLoggedIn]);

  return currentGroups.length > 0 || pastGroups.length > 0 ? (
    <div>
      <Typography variant="h4" className={classes.title}>
        ACTIVE GROUPS
      </Typography>
      {currentGroups.length === 0 ? (
        <center>
          <div>You do not have any active groups</div>
        </center>
      ) : (
        <Grid container spacing={2}>
          {currentGroups.map((a) => {
            return (
              <Grid item>
                <GroupComponent group={a} />{" "}
              </Grid>
            );
          })}
        </Grid>
      )}

        <Typography variant="h4" className={classes.title}>
            EXPIRED GROUPS
        </Typography>
      {pastGroups.length === 0 ? (
        <center>
          <div>You do not have any past groups</div>
        </center>
      ) : (
        <Grid container spacing={2}>
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
