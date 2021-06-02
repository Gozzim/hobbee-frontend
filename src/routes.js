import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";

// routes within the movie database example app
// used for routing

const routes = [
    {
        path: "/login",
        component: UserLoginView,
    },
    {
        path: "/register",
        component: SignUpView,
    },
];

export default routes;
