import React, { FC } from "react";
import styles from "./Title.module.scss";
import {useThemeContext} from "src/context/Theme";
import {Theme} from "src/@types";
import classNames from "classnames";

type TitleProps = {
    title: string;
    className?: string;
};

const Title: FC<TitleProps> = ({ title, className }) => {

    const { themeValue } = useThemeContext();

    return <div  className={classNames(styles.title, className, {
        [styles.darkTitle]: themeValue === Theme.Dark,
    })}>{title}</div>
};
export default Title;

