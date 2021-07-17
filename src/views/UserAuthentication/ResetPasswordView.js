import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { ResetPasswordComponent } from "../../components/ResetPasswordComponent";

/**
 * For user reset pass
 * @param {props} props
 */
function ResetPasswordView(props) {

    return (
        <ResetPasswordComponent
            {...props}
        />
    );
}

export default connect()(withRouter(ResetPasswordView));
