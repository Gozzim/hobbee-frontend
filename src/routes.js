import React from "react";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import { Imprint } from "./views/Imprint"
import { PrivacyPolicy } from "./views/PrivacyPolicy"
import { ToS } from "./views/TermsOfService"

// routes within the movie database example app
// used for routing
// TODO: Add dynamic routing

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
]