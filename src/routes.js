import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import CreateGroupView from "./views/CreateGroupView";
import HomeView from "./views/HomeView";
import InMyAreaView from "./views/InMyAreaView";
import PremiumView from "./views/PremiumView";
import RecommendedView from "./views/RecommendedView";
import MyGroupsView from "./views/MyGroupsView";

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
    {
        path: "/create-group",
        component: CreateGroupView,
    },
    {
        path: "/in-my-area",
        component: InMyAreaView,
    },
    {
        path: "/premium",
        component: PremiumView,
    },
    {
        path: "/recommended",
        component: RecommendedView,
    },
    {
        path: "/my-groups",
        component: MyGroupsView,
    },
    {
        path: "/",
        component: HomeView,
    },
];

export default routes;
