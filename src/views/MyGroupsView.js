import React from "react";
import { MyGroupsResultsComponent } from "../components/MyGroupsResultsComponent";
import {Typography} from "@material-ui/core";

/**
 * For my groups
 * @param {props} props
 */
export function MyGroupsView(props) {
  return (
    <div>
        <Typography
            variant={"h3"}
            align="center"
            style={{ fontWeight: "bold", marginBottom: "40px" }}
        >
            MY GROUPS
        </Typography>
      <MyGroupsResultsComponent/>

    </div>
  );
}
