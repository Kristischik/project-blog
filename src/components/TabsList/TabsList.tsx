import React, { FC } from "react";

import Tab from "./Tab";
import { TabsListType, TabsTypes } from "src/@types";
import styles from "./TabsList.module.scss";

type TabsListProps = {
    tabsList: TabsListType;
    activeTab: TabsTypes;
    onTabClick: (tab: TabsTypes) => () => void;
};

const TabsList: FC<TabsListProps> = ({ tabsList, activeTab, onTabClick }) => {
    return (
        <div className={styles.tabsContainer}>
            {tabsList.map(({ key, title, disabled }) => (
                <Tab
                    key={key}
                    title={title}
                    onClick={onTabClick(key)} //() => (tab) => setTab(tab)
                    active={activeTab === key}
                    disabled={disabled}
                />
            ))}
        </div>
    );
};

export default TabsList;