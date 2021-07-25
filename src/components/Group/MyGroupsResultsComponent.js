import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import GroupComponent from "./GroupComponent";
import { getMyGroups } from "../../redux/reducers/groupsReducer";
import { useLocation } from "react-router";
import { Tooltip, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginTop: "40px",
    marginBottom: "25px",
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 14,
    margin: 0,
  },
}))(Tooltip);

export function MyGroupsResultsComponent() {
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
  const location = useLocation();

  React.useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getMyGroups());
    }
  }, [user.isLoggedIn, location, dispatch]);

  return currentGroups.length > 0 || pastGroups.length > 0 ? (
    <div style={{ marginBottom: "30px" }}>
      <Typography variant="h4" className={classes.title}>
        ACTIVE GROUPS
      </Typography>
      {currentGroups.length === 0 ? (
        <Typography variant="h5">You don't have any active groups.</Typography>
      ) : (
        <Grid container spacing={2}>
          {currentGroups.map((a, i) => {
            return (
              <Grid item key={i}>
                <GroupComponent group={a} />{" "}
              </Grid>
            );
          })}
        </Grid>
      )}

      <div style={{ display: "flex" }}>
        <Typography variant="h4" className={classes.title}>
          EXPIRED GROUPS
          <CustomTooltip
              placement="right"
            title="A group expires once it reaches its meeting date. Group members are still able to chat, but the group can not be edited, joined or left anymore."
            style={{ marginLeft: "20px", fill: "#aaaaaa" }}
          >
            <HelpIcon />
          </CustomTooltip>
        </Typography>
      </div>
      {pastGroups.length === 0 ? (
        <Typography variant="h5">
          None of your groups have expired yet.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {pastGroups.map((a, i) => {
            return (
              <Grid item key={i}>
                <GroupComponent group={a} />{" "}
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  ) : (
    <div>
      <Typography
        variant="h4"
        align={"center"}
        style={{ marginTop: "40px", marginBottom: "10px" }}
      >
        You don't seem to be in any groups.
      </Typography>
      <Typography variant="h5" align={"center"}>
        Try joining one or creating your own!
      </Typography>
    </div>
  );
}
