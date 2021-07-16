import React from "react";
import {SearchBarSmallComponent} from "../components/SearchBarSmallComponent"
import {GroupResultsComponentDemo} from "../components/GroupResultsComponentDemo"

export function RecommendedView(props) {
  return (
    <div>

      <SearchBarSmallComponent/>

      <center><h1> RECOMMENDED FOR YOU </h1></center>

      <GroupResultsComponentDemo/>
    </div>
  );
}
