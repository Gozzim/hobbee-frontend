import React from "react";
import {SearchBarComponent} from "../components/SeachBarComponent";
import {GroupResultsComponentDemo} from "../components/GroupResultsComponentDemo"

export function InMyAreaView(props) {
  return (
    <div>

      <SearchBarComponent/>

      <center><h1> GROUPS IN YOUR AREA </h1></center>

      <GroupResultsComponentDemo/>

    </div>
  )
}
