import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import Button, { ButtonTypes } from "src/components/Button";
import {CloseIcon, MenuIcon, SearchIcon} from "src/assets/icons";

import styles from "./Header.module.scss";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import { RoutesList } from "src/pages/Router";
import Username from "src/components/Username";
import { useThemeContext } from "src/context/Theme";
import classNames from "classnames";
import { Theme } from "src/@types";
import Input from "src/components/Input";

const Header = () => {
    const { themeValue } = useThemeContext();

    const isLoggedIn = true;

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
    };

    const onLoginButtonClick = () => {
        navigate(RoutesList.SignIn);
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
                {isLoggedIn && <Username username={"Kristina"} />}
            </div>
        </div>

            <div className={styles.infoContainer}>
                <Outlet />
                <div className={styles.footer}>
                    <div>©2022 Blogfolio</div>
                    <div>All rights reserved</div>
                </div>
            </div>
            {isOpened && (
                <div className={styles.menuContainer}>
                    <div>
                        {isLoggedIn && <Username username={"Kristina"} />}
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
                            onClick={onLoginButtonClick}
                            className={styles.authButton}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;