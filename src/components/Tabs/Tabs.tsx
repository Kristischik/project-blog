import React, { FC, ReactElement } from "react";
import classNames from "classnames";
import styles from "./Tabs.module.scss";


export enum TabsTypes {
    All = "all",
    Favorites = "favorites",
    Popular = "popular",
}

type TabsProps = {
    type: TabsTypes;
    title: string | ReactElement;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
};

const Tabs: FC<TabsProps> = ({
                                 type,
                                 title,
                                 onClick,
                                 disabled,
                                 active,
                             }) => {
    const tabsStyle = styles[type];
    return (
        <div
            onClick={!disabled ? onClick : undefined}
            className={classNames(tabsStyle, {
                [styles.disabled]: disabled,
                [styles.active]: active,
            })}
        >
            {title}
        </div>
    );
};

export default Tabs;