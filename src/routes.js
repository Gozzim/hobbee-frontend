import React from "react";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import { CreateGroupView } from "./views/CreateGroupView";
import { HomeView } from "./views/HomeView";
import { InMyAreaView } from "./views/InMyAreaView";
import { PremiumView } from "./views/PremiumView";
import { RecommendedView } from "./views/RecommendedView";
import { MyGroupsView } from "./views/MyGroupsView";
import { Imprint } from "./views/Imprint";
import { PrivacyPolicy } from "./views/PrivacyPolicy";
import { ToS } from "./views/TermsOfService";

// routes within the movie database example app
// used for routing

export const routes = [
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
    path: "/imprint",
    component: Imprint,
  },
  {
    path: "/tos",
    component: ToS,
  },
  {
    path: "/privacy",
    component: PrivacyPolicy,
  },
  {
    path: "/",
    component: HomeView,
  },
];
