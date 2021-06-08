import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";

function HomeView(props) {

    return (
        <div>
            This is HOME page.
        </div>
    );
}

export default connect()(withRouter(HomeView));