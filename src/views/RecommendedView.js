import Fuse from "fuse.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { SearchBarSmallComponent } from "../components/SearchBarSmallComponent";
import { getRecommendedGroups } from "../redux/reducers/groupsReducer";
import { MyGroupsResultsComponent } from "../components/MyGroupsResultsComponent";
import Grid from "@material-ui/core/Grid";
import { GroupComponent } from "../components/GroupComponent";

export function RecommendedView() {
  const groups = useSelector((state) => {
    return state.groups.recommended.map((id) => state.groups.data[id]);
  });
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (groups.length === 0) {
      dispatch(getRecommendedGroups());
    }
  }, []);

  const fuse = new Fuse(groups, {
    keys: ["groupName", "city"],
  });
  const filteredGroups = inputValue
    ? fuse.search(inputValue).map((result) => result.item)
    : groups;
  console.log(filteredGroups);

  return (
    <div>
      <SearchBarSmallComponent
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />

      <center>
        <h1>RECOMMENDED FOR YOU</h1>
        {filteredGroups.length > 0 ? (
          <div>
            <Grid container spacing={2} justify="center">
              {filteredGroups.map((group) => {
                return (
                  <Grid item key={group._id}>
                    <GroupComponent group={group} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : (
          <div>
            <center>
              <h1>You dont seem to be part of any group!</h1>
            </center>
            <center>
              <p>Maybe try joining some!</p>
            </center>
          </div>
        )}
      </center>
    </div>
  );
}
