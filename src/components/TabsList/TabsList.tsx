import React from 'react';
import styles from './TabsList.module.scss'
import Tabs, { TabsTypes } from '../Tabs';

const TabsList = () => {
    return (
        <div>
            <div className={styles.tabsContainer}>
                <Tabs
                    type={TabsTypes.All}
                    title={'All'}
                    onClick={() => { alert('All') }}
                    active
                />
                <Tabs
                      type={TabsTypes.Favorites}
                      title={'My favorites'}
                      onClick={() => { alert('My favorites') }}
                />

                <Tabs
                      type={TabsTypes.Popular}
                      title={'Popular'}
                      onClick={() => { alert('Popular') }}
                />
            </div>
            <div className={styles.tabsContainer}>
                <Tabs
                      type={TabsTypes.All}
                      title={'All'}
                      onClick={() => { alert('All') }}
                      active
                />

                <Tabs
                      type={TabsTypes.Favorites}
                      title={'My favorites'}
                      onClick={() => { alert('My favorites') }}
                />

                <Tabs
                      type={TabsTypes.Popular}
                      title={'Popular'}
                      onClick={() => { alert('Popular') }}
                />
            </div>
            <div className={styles.tabsContainer}>
                <Tabs
                      type={TabsTypes.All}
                      title={'All'}
                      onClick={() => { alert('All') }}
                      active
                />

                <Tabs
                      type={TabsTypes.Favorites}
                      title={'My favorites'}
                      onClick={() => { alert('My favorites') }}
                />

                <Tabs
                      type={TabsTypes.Popular}
                      title={'Popular'}
                      onClick={() => { alert('Popular') }}
                      disabled
                />
            </div>
        </div>
    )
}

export default TabsList