import React from "react";
import classNames from "classnames";
import styles from "./ThemeSwitcher.module.scss";
import {SunIcon, MoonIcon} from "src/assets/icons";
import {useThemeContext} from "src/context/Theme";
import {Theme} from "src/@types";

const ThemeSwitcher = () => {
    const { themeValue, onChangeTheme } = useThemeContext();

    return (
        <div className={styles.container}>
            <div
                className={classNames(styles.button, {
                    [styles.activeButton]: themeValue === Theme.Light,
                })}
                onClick={onChangeTheme(Theme.Light)}
            >
                <SunIcon />
            </div>
            <div
                className={classNames(styles.button, {
                    [styles.activeButton]: themeValue === Theme.Dark,
                })}
                onClick={onChangeTheme(Theme.Dark)}
            >
                <MoonIcon />
            </div>
        </div>
    );
};

export default ThemeSwitcher;