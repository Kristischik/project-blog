import React, { FC } from "react";
import styles from "./Title.module.scss";

type TitleProps = {
    title: string;
    className?: string;
};

const Title: FC<TitleProps> = ({ title }) => {
    return <div className={styles.title}>{title}</div>
};
export default Title;

