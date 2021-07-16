import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { GroupComponent } from "../components/GroupComponent";

export function MyGroupsResultsComponent(props) {

  const [myGroups, setMyGroups] = useState([]);

  const groups = useSelector((state) => state.groups.items);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.isLoggedIn) {
      //console.log(groups) //TO Delete
      //console.log([...groups]) //To Delete
      setMyGroups(groups);
    }
  }, [groups])

  return (
    myGroups.length > 0  ?
      (
        <div>
          <center><h1> YOUR GROUPS </h1></center>

          <Grid container spacing={2} justify="center">

            {() => {
              return myGroups.map((a) => { (<Grid item> <GroupComponent group={a}/> </Grid>)
              })
            }


            }
          </Grid>
        </div>

      )
      :
      (
        <div>
          <center><h1> You dont seem to be part of any group! </h1></center>
          <center><p> Maybe try joining some!</p></center>
        </div>
      )
  )
}