import React, { useMemo, useState, KeyboardEvent} from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import Button, { ButtonTypes } from "src/components/Button";
import {CloseIcon, MenuIcon, SearchIcon, UserIcon} from "src/assets/icons";

import styles from "./Header.module.scss";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import { RoutesList } from "src/pages/Router";
import Username from "src/components/Username";
import { useThemeContext } from "src/context/Theme";
import classNames from "classnames";
import { Theme } from "src/@types";
import Input from "src/components/Input";
import {useDispatch, useSelector} from "react-redux";
import {AuthSelectors, logoutUser} from "src/redux/reducers/authSlice";

const Header = () => {
    const { themeValue } = useThemeContext();
    const dispatch = useDispatch()
    // const isLoggedIn = true;
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    const [isOpened, setOpened] = useState(false);
    const [isSearch, setSearch] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const navigate = useNavigate();

    const navLinks = useMemo(
        () => [
            { path: RoutesList.Home, title: "Home" },
            ...(isLoggedIn ? [{ path: RoutesList.SignUp, title: "Add Post" }] : []),
        ],
        [isLoggedIn]
    );

    const handleMenuOpened = () => {
        setOpened(!isOpened);
    };

    const handleSearchOpened = () => {
        setSearch(!isSearch);
        if (isSearch && inputValue) {
            navigate(`posts/${inputValue}`);
            setInputValue("");
        }
    };

    const onLoginButtonClick = () => {
        navigate(RoutesList.SignIn);
    };

    const userInfo = useSelector(AuthSelectors.getUserInfo);

    const onLogout = () => {
        dispatch(logoutUser());
    };

    const onKeyDown = (
      event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            handleSearchOpened();
        }
    };


    return (
        <div
            className={classNames(styles.container, {
                [styles.darkContainer]: themeValue === Theme.Dark,
            })}
        >
            <div className={styles.header}>
                <Button
                    type={ButtonTypes.Primary}
                    title={isOpened ? <CloseIcon /> : <MenuIcon />}
                    onClick={handleMenuOpened}
                    className={styles.burgerMenuButton}
                />

            {isSearch && (
                <div className={styles.searchContainer}>
                    <Input
                        placeholder="Search..."
                        onChange={setInputValue}
                        value={inputValue}
                        className={styles.searchInput}
                        onKeyDown={onKeyDown}
                    />
                    <div>
                        <Button
                            type={ButtonTypes.Primary}
                            title={<CloseIcon />}
                            onClick={handleSearchOpened}
                            className={styles.searchClose}
                        />
                    </div>
                </div>
            )}
            <div className={styles.searchButtonContainer}>
                <Button
                    type={ButtonTypes.Primary}
                    title={<SearchIcon />}
                    onClick={handleSearchOpened}
                    className={styles.searchButton}
                />
                {isLoggedIn && userInfo ? <Username username = {userInfo.username} /> : <Button
                  type={ButtonTypes.Primary}
                  title={<UserIcon />}
                  onClick={onLoginButtonClick}
                  className={styles.userButton}
                />}
            </div>
        </div>

            <div className={styles.infoContainer}>
                <Outlet />
                <div className={styles.footer}>
                    <div>©2022 Blogofolio</div>
                    <div>All rights reserved</div>
                </div>
            </div>
            {isOpened && (
                <div className={styles.menuContainer}>
                    <div>
                        {isLoggedIn && userInfo && < Username username={userInfo?.username} />}
                        {navLinks.map((link) => (
                            <NavLink
                                to={link.path}
                                key={link.path}
                                className={styles.navLinkButton}
                            >
                                {link.title}
                            </NavLink>
                        ))}
                    </div>
                    <div>
                        <ThemeSwitcher />
                        <Button
                            type={ButtonTypes.Secondary}
                            title={isLoggedIn ? "Log Out" : "Sign In"}
                            onClick={isLoggedIn ? onLogout : onLoginButtonClick}
                            className={styles.authButton}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;