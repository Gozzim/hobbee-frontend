import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { SignUpComponent } from "../../components/SignUpComponent";
import { register } from "../../redux/reducers/userReducer";

/**
 * For register new users
 * @param {props} props
 */
function SignUpView(props) {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user) {
      props.history.push("/profile");
    }
  }, [user, props.history]);

  const onRegister = (username, email, password, bday, hobbies) => {
    props.dispatch(register({
      username: username,
      email: email,
      password: password,
      dateOfBirth: bday,
      hobbies: [...hobbies],
    }))
  };

  return (
    <SignUpComponent user={user} onRegister={onRegister} />
  );
}

export default connect()(withRouter(SignUpView));
