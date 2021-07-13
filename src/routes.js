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
import { ProfileView } from "./views/ProfileView";
import ResetPasswordView from "./views/UserAuthentication/ResetPasswordView";

export const routes = [
  {
    path: "/profile",
    component: ProfileView,
  },
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
    exact: true,
    path: "/password-reset/:user/:token",
    component: ResetPasswordView,
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
