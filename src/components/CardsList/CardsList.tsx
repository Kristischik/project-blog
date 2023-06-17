import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { Post, PostsList } from "src/@types";

import  Card, { CardPostTypes} from "../CardPost";
import styles from "./CardsList.module.scss";
import {
    setSelectedPost,
    setSelectedPostModalOpened,
} from "src/redux/reducers/postSlice";
import {setSelectedImage, setSelectedImageModalOpened} from "src/redux/reducers/imageSlice";


type CardsListProps = {
    cardsList: PostsList;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
    const dispatch = useDispatch();
    const onMoreClick = (post: Post) => () => {
        dispatch(setSelectedPostModalOpened(true));
        dispatch(setSelectedPost(post));
        // dispatch - ручки
        // setSelectedPost - экшен, куда данные должны улететь
        // null - payload, т е сами данные, которые летят в ф-ии, которые их меняют
    };

    const onImageClick = (cardsList: string ) => () => {
        dispatch(setSelectedImageModalOpened(true))
        dispatch(setSelectedImage(cardsList))

    }

    return cardsList.length ? (
        <div className={styles.cardListContainer}>
            <div className={styles.cardListWrap}>
                <Card
                    type={CardPostTypes.Large}
                    {...cardsList[0]}
                    onMoreClick={onMoreClick(cardsList[0])}
                    onImageClick={onImageClick(cardsList[0].image)}
                />
                <div className={styles.mediumContainer}>
                    {cardsList.map((el, idx) => {
                        if (idx >= 1 && idx <= 4) {
                            return (
                                <Card
                                    key={el.id}
                                    type={CardPostTypes.Medium}
                                    {...el}
                                    onMoreClick={onMoreClick(el)}
                                    onImageClick={onImageClick(cardsList[0].image)}
                                />
                            );
                        }
                    })}
                </div>
            </div>
            <div className={styles.smallContainer}>
                {cardsList.map((el, idx) => {
                    if (idx >= 5 && idx <= 10) {
                        return (
                            <Card
                                key={el.id}
                                type={CardPostTypes.Small}
                                {...el}
                                onMoreClick={onMoreClick(el)}
                                onImageClick={onImageClick(cardsList[0].image)}
                            />
                        );
                    }
                })}
            </div>
        </div>
    ) : null;
};

export default CardsList;
