import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";

function RecommendedView(props) {

    return (
        <div>
            This is RECOMMENDED page.
        </div>
    );
}

export default connect()(withRouter(RecommendedView));