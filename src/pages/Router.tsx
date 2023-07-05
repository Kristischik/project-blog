import React, {useEffect} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "src/pages/Home";
import SignUp from "src/pages/SignUp";
import RegistrationConfirmation from "src/pages/RegistrationConfirmation";
import Header from "src/components/Header";
import SelectedPost from "src/pages/SelectedPost";
import {useDispatch, useSelector} from "react-redux";
import {AuthSelectors, getUserInfo} from "src/redux/reducers/authSlice";
import SignIn from "src/pages/SignIn";
import Success from "src/pages/Success";

export enum RoutesList {
    Home = "/",
    SignUp = "/sign-up",
    SignIn = "/sign-in",
    RegistrationConfirmation = "/activate/:uid/:token",
    SelectedPost = '/post/:id',
    Success = "/sing-up/confirm/success",
    Default = "*",
}

const Router = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    useEffect(() => {
      if (isLoggedIn) {
        dispatch(getUserInfo());
      }
    }, [isLoggedIn])

    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutesList.Home} element={<Header />}>
                    <Route path={RoutesList.Home} element={<Home />} />
                    <Route path={RoutesList.SignUp} element={!isLoggedIn ? <SignUp /> : <Navigate to={RoutesList.Home}/>} />
                    <Route path={RoutesList.SignIn} element={!isLoggedIn ? <SignIn /> : <Navigate to={RoutesList.Home}/>} />
                    <Route path={RoutesList.SelectedPost} element={!isLoggedIn ? <SelectedPost /> : <Navigate to={RoutesList.Home}/>} />
                    <Route
                        path={RoutesList.RegistrationConfirmation}
                        element={!isLoggedIn ? <RegistrationConfirmation /> : <Navigate to={RoutesList.Home}/>}
                    />
                    <Route path={RoutesList.Success} element={!isLoggedIn ? <Success /> : <Navigate to={RoutesList.Home}/>} />
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