import React, { FC } from "react";
import {PostsList} from "../../@types";
import styles from './CardsList.module.scss'
import Card, {CardPostTypes} from "../CardPost";

type CardsListProps = {
    cardsList: PostsList,

}


const CardsList: FC<CardsListProps> = ({ cardsList }) => {
    return cardsList.length ? (
        <div className={styles.cardListContainer}>
            <div className={styles.cardListWrap}>
                <Card type={CardPostTypes.Large} {...cardsList[0]} />
                <div className={styles.mediumContainer}>
                    {cardsList.map((el, idx) => {
                        if (idx >= 1 && idx <= 4) {
                            return <Card key={el.id} type={CardPostTypes.Medium} {...el} />;
                        }
                    })}
                </div>
            </div>
            <div className={styles.smallContainer}>
                {cardsList.map((el, idx) => {
                    if (idx >= 5 && idx <= 10) {
                        return <Card key={el.id} type={CardPostTypes.Small} {...el} />;
                    }
                })}
            </div>
        </div>
    ) : null;
};

export default CardsList;
