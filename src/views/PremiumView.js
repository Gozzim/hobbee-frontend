import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";

function PremiumView(props) {

    return (
        <div>
            This is PREMIUM page.
        </div>
    );
}

export default connect()(withRouter(PremiumView));