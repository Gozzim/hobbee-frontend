import React from "react";
import Grid from "@material-ui/core/Grid";
import {GroupComponent} from "../components/GroupComponent";
import {GroupComponentVertical} from "../components/GroupComponentVertical";

export function MyGroupsView(props) {
  return (
      <div>


        <h3> These are your groups: (Note: first 9 use GroupComponent, last 6 use GroupCompontentVertical)</h3>

        <h3> Todo: Add filters at this position </h3>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>
          <Grid item xs={4}>
            <GroupComponent />
          </Grid>

          <Grid item xs={2}>
            <GroupComponentVertical />
          </Grid>
          <Grid item xs={2}>
            <GroupComponentVertical />
          </Grid>
          <Grid item xs={2}>
            <GroupComponentVertical />
          </Grid>
          <Grid item xs={2}>
            <GroupComponentVertical />
          </Grid>
          <Grid item xs={2}>
            <GroupComponentVertical />
          </Grid>
          <Grid item xs={2}>
            <GroupComponentVertical />
          </Grid>

        </Grid>
      </div>
  );
}
