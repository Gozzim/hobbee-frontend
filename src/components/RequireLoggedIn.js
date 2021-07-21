import { useSelector } from "react-redux";
import { Redirect } from "react-router";

export function RequireLoggedIn(props) {
  const user = useSelector((state) => {
    return state.user;
  });

  if (user.isLoggedIn) {
    return props.children;
  }

  return <Redirect to="/login#forbidden" />;
}
