import React, { FC, ReactElement } from "react";
import classNames from "classnames";
import styles from "./Tab.module.scss";


type TabsProps = {
    title: string | ReactElement;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
};

const Tab: FC<TabsProps> = ({ title, onClick, disabled, active }) => {
    return (
        <div
            onClick={!disabled ? onClick : undefined}
            className={classNames(styles.tab, {
                [styles.active]: active,
                [styles.disabled]: disabled,
            })}
        >
            {title}
        </div>
    );
};
export default Tab;