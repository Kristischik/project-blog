import React, { FC } from "react";
import { useDispatch } from "react-redux";

import {LikeStatus, Post, PostsList} from "src/@types";

import  Card, { CardPostTypes} from "../CardPost";
import styles from "./CardsList.module.scss";
import {
    setLikeStatus, setSaveStatus,
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

    const onStatusClick = (card: Post) => (status: LikeStatus)  => {
        dispatch(setLikeStatus({card, status}))

    }

    const onSaveClick = (card: Post) => ()  => {
        dispatch(setSaveStatus({card}))
    }

    return cardsList.length ? (
        <div className={styles.cardListContainer}>
            <div className={styles.cardListWrap}>
                <Card
                    type={CardPostTypes.Large}
                    {...cardsList[0]}
                    onMoreClick={onMoreClick(cardsList[0])}
                    onImageClick={onImageClick(cardsList[0].image)}
                    onStatusClick = {onStatusClick(cardsList[0])}
                    onSaveClick = {onSaveClick(cardsList[0])}
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
                                    onImageClick={onImageClick(el.image)}
                                    onStatusClick = {onStatusClick(el)}
                                    onSaveClick = {onSaveClick(el)}
                            />
                            );
                        } else {
                            return null
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
                                onImageClick={onImageClick(el.image)}
                                onStatusClick = {onStatusClick(el)}
                                onSaveClick = {onSaveClick(el)}
                            />
                        );
                    } else {
                        return null
                    }
                })}
            </div>
        </div>
    ) : null;
};

export default CardsList;
