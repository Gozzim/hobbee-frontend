import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";

function CreateGroupView(props) {

    return (
        <div>
            This is CREATE GROUP page.
        </div>
    );
}

export default connect()(withRouter(CreateGroupView));