import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { LoginComponent } from "../components/UserLoginComponent";
import { login } from "../redux/reducers/userReducer";

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
  const user = useSelector((state) => state.user);

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

  const onCancel = () => {
    onAfterLogin();
  };

  const onSignUp = () => {
    props.history.push("/register");
  };

  return (
    <LoginComponent
      user={user}
      onCancel={onCancel}
      onLogin={onLogin}
      onSignUp={onSignUp}
    />
  );
}

export default connect()(withRouter(UserLoginView));
