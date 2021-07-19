import React from "react";
import SignInView from "./views/UserAuthentication/SignInView";
import SignUpView from "./views/UserAuthentication/SignUpView";
import { CreateGroupView } from "./views/CreateGroupView";
import { HomeView } from "./views/HomeView";
import { InMyAreaView } from "./views/InMyAreaView";
import { PremiumView } from "./views/PremiumView";
import { RecommendedView } from "./views/RecommendedView";
import { MyGroupsView } from "./views/MyGroupsView";
import { Imprint } from "./views/Legal/Imprint";
import { PrivacyPolicy } from "./views/Legal/PrivacyPolicy";
import { ToS } from "./views/Legal/TermsOfService";
import { ProfileView } from "./views/ProfileView";
import ResetPasswordView from "./views/UserAuthentication/ResetPasswordView";
import { GroupPageView } from "./views/GroupPageView";
import { PaymentPlanView } from "./views/PaymentPlanView";
import { PaymentConfirmationView } from "./views/PaymentConfirmationView";

// routes within the movie database example app
// used for routing

export const routes = [
  {
    path: "/profile",
    component: ProfileView,
  },
  {
    path: "/login",
    component: SignInView,
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
    path: "/premium/payment-confirmation",
    component: PaymentConfirmationView,
  },
  {
    path: "/premium/payment-plan",
    component: PaymentPlanView,
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
    path: "/group-page/:id",
    component: GroupPageView,
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
