import { Breadcrumbs } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function DynamicBreadcrumbs(props) {
  return (
    <Route>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ marginBottom: "30px" }}
      >
        {props.crumbs.map(({ path, label }, i) => {
          return i < props.crumbs.length - 1 ? (
            <Link
              className={"linkDefault"}
              to={path}
              key={i}
              style={{ color: "black" }}
            >
              {label}
            </Link>
          ) : (
            <span key={i}>{label}</span>
          );
        })}
      </Breadcrumbs>
    </Route>
  );
}

export default connect()(withRouter(DynamicBreadcrumbs));
