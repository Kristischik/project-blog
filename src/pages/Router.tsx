import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "src/pages/Home";
import SignUp from "src/pages/SignUp";
import RegistrationConfirmation from "src/pages/RegistrationConfirmation";
import Header from "src/components/Header";
import SelectedPost from "src/pages/SelectedPost";

export enum RoutesList {
    Home = "/",
    SignUp = "/sign-up",
    SignIn = "/sign-in",
    RegistrationConfirmation = "/activate/:uid/:token",
    SelectedPost = '/post/:id',
    Default = "*",
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutesList.Home} element={<Header />}>
                    <Route path={RoutesList.Home} element={<Home />} />
                    <Route path={RoutesList.SignUp} element={<SignUp />} />
                    <Route path={RoutesList.SignIn} element={<SignUp />} />
                    <Route path={RoutesList.SelectedPost} element={<SelectedPost />} />
                    <Route
                        path={RoutesList.RegistrationConfirmation}
                        element={<RegistrationConfirmation />}
                    />
                    <Route
                        path={RoutesList.Default}
                        element={<Navigate to={RoutesList.Home} />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;