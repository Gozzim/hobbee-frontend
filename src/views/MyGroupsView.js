import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";

function MyGroupsView(props) {

    return (
        <div>
            This is MY GROUPS page.
        </div>
    );
}

export default connect()(withRouter(MyGroupsView));