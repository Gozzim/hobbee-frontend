import React from "react";
import Grid from "@material-ui/core/Grid";
import {GroupComponent} from "../components/GroupComponent";


export function GroupResultsComponentDemo(props) {
  return (
    <div>

      <Grid container spacing={2} justify="center">
        <Grid item>
          <GroupComponent/>
        </Grid>
        <Grid item>
          <GroupComponent/>
        </Grid>
        <Grid item>
          <GroupComponent/>
        </Grid>

        <Grid item>
          <GroupComponent/>
        </Grid>
        <Grid item>
          <GroupComponent/>
        </Grid>
        <Grid item>
          <GroupComponent/>
        </Grid>


        <Grid item>
          <GroupComponent/>
        </Grid>
        <Grid item>
          <GroupComponent/>
        </Grid>
        <Grid item>
          <GroupComponent/>
        </Grid>


        <Grid item>
          <GroupComponent/>
        </Grid>
        <Grid item>
          <GroupComponent/>
        </Grid>
        <Grid item>
          <GroupComponent/>
        </Grid>


      </Grid>


    </div>
  )
}