import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { LoginComponent } from "../../components/UserLoginComponent";
import { login } from "../../redux/reducers/userReducer";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

/**
 * For user login
 * @param {props} props
 */
function SignInView(props) {
  const user = useSelector((state) => state.user);

  const showNotification = props.location.hash === "#forbidden";

  const onAfterLogin = () => {
    let targetPath = "/";
    try {
      // get last visited site for redirect
      targetPath = sessionStorage.getItem("last_visited");
    } catch (e) {
      // sessionStorage not supported
    }
    props.history.push(targetPath);
  };

  useEffect(() => {
    if (user.user) {
      onAfterLogin();
    }
  }, [user, props.history]);

  const onLogin = (username, password) => {
    props.dispatch(login({ username, password }));
  };

  const onClose = () => {
    props.history.replace("/login");
  };

  return (
    <>
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={(_event, reason) => {
          // Only close after autoHideDuration expired
          if (reason === "timeout") {
            onClose();
          }
        }}
      >
        <Alert onClose={onClose} severity="error">
          You need to be logged in to access that page!
        </Alert>
      </Snackbar>
      <LoginComponent user={user} onLogin={onLogin} />
    </>
  );
}

export default connect()(withRouter(SignInView));
