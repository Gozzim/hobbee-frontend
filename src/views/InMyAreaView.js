import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";

function InMyAreaView(props) {

    return (
        <div>
            This is IN MY AREA page.
        </div>
    );
}

export default connect()(withRouter(InMyAreaView));