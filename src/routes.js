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
import { FeedbackView } from "./views/Feedback/FeedbackView";

export const routes = [
  {
    path: "/",
    Component: HomeView,
    label: "Home",
  },
  {
    path: "/profile",
    Component: ProfileView,
    label: "User-Profile",
  },
  {
    path: "/login",
    Component: SignInView,
    label: "Login",
  },
  {
    path: "/register",
    Component: SignUpView,
    label: "Create Account",
  },
  {
    path: "/create-group",
    Component: CreateGroupView,
    label: "Create Group"
  },
  {
    path: "/premium",
    Component: PremiumView,
    label: "Premium",
  },
  {
    path: "/premium/payment-plan",
    Component: PaymentPlanView,
    label: "Payment Plan",
  },
  {
    path: "/premium/payment-confirmation",
    Component: PaymentConfirmationView,
    label: "Confirmation",
  },
  {
    path: "/recommended",
    Component: RecommendedView,
    label: "Recommendations",
  },
  {
    path: "/in-my-area",
    Component: InMyAreaView,
    label: "In my Area",
  },
  {
    path: "/my-groups",
    Component: MyGroupsView,
    label: "My Groups",
  },
  {
    path: "/feedback/:id",
    Component: FeedbackView,
    label: "Your Feedback",
  },
  {
    path: ["/group/:id", "/my-groups/:id", "/recommended/:id", "/in-my-area/:id"],
    Component: GroupPageView,
    label: "View Group",
  },
  {
    path: "/password-reset/:user/:token",
    Component: ResetPasswordView,
    label: "Account Recovery",
  },
  {
    path: "/imprint",
    Component: Imprint,
    label: "Imprint",
  },
  {
    path: "/tos",
    Component: ToS,
    label: "Terms of Service",
  },
  {
    path: "/privacy",
    Component: PrivacyPolicy,
    label: "Privacy Policy",
  },
];
