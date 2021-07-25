import { useSelector } from "react-redux";
import { Redirect } from "react-router";

export function RequireLoggedIn(props) {
  const user = useSelector((state) => {
    return state.user;
  });

  // Wait until we know whether the user is logged in or not
  if (!user.authReady) return null;
  // If the user is not logged in, redirect to sign in page
  if (!user.isLoggedIn) return <Redirect to="/login#forbidden" />;

  return props.children;
}
