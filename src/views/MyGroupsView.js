import React from "react";
import { MyGroupsResultsComponent } from "../components/MyGroupsResultsComponent";
import { RequireLoggedIn } from "../components/RequireLoggedIn";

/**
 * For my groups
 * @param {props} props
 */
export function MyGroupsView(props) {
  return (
    <div>

      <MyGroupsResultsComponent/>

    </div>
  );
}
