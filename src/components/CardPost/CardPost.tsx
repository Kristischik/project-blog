import React, { FC } from "react";
import classNames from "classnames";
import styles from "./CardPost.module.scss";
import {BookmarkIcon, DislikeIcon, LikeIcon, MoreIcon} from "../../assets/icons";


export enum CardPostTypes {
    Large = "large",
    Medium = "medium",
    Small = "small",
}

type CardPostProps = {
    type:CardPostTypes;
    id?: number;
    image: string;
    text?: string;
    date: string;
    lesson_num?: number;
    title: string;
    author?: number;
};

const Card: FC<CardPostProps> = ({
                                     type,
                                     image,
                                     text,
                                     date,
                                     title,

                             }) => {
    const cardStyle = styles[type];
    return (
        <div>
            <div className={classNames(cardStyle)}>
                <div className={styles['content']}>
                    <div className={styles['content-text']}>
                        <span className={styles['content-text-date']}>{date}</span>
                        <h2 className={styles['content-text-title']}>{title}</h2>
                        {type === CardPostTypes.Large && (
                            <div className={styles['content-text-description']}>{text}</div>
                        )}
                    </div>
                    <div className={styles['content-img']}>
                        <img src={image} alt="#" />
                    </div>
                </div>
                <div className={styles['icons']}>
                    <div className={styles['icons-like']}>
                        <LikeIcon />
                        <DislikeIcon />
                    </div>
                    <div className={styles['icons-book']}>
                        <BookmarkIcon />
                        <MoreIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Card;