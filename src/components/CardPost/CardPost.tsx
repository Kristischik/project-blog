import React, { FC } from "react";
import classNames from "classnames";
import styles from "./CardPost.module.scss";
import {BookmarkIcon, DislikeIcon, LikeIcon, MoreIcon} from "src/assets/icons";
import {useThemeContext} from "src/context/Theme";
import {Theme} from "src/@types";


export enum CardPostTypes {
    Large = "large",
    Medium = "medium",
    Small = "small",
}

type CardPostProps = {
    type: CardPostTypes;
    id?: number;
    image?: string;
    text?: string;
    date?: string;
    lesson_num?: number;
    title?: string;
    author?: number;
    onMoreClick?: () => void;
};

const Card: FC<CardPostProps> = ({
                                     type,
                                     date,
                                     title,
                                     text,
                                     image,
                                     onMoreClick,

                             }) => {
    const cardStyle = styles[type];
    const { themeValue } = useThemeContext();
    return (
        <div>
            <div className={classNames(cardStyle)}>
                <div className={styles['content']}>
                    <div className={styles['content-text']}>
                        <span className={styles['content-text-date']}>{date}</span>
                        <h2 className={classNames(styles['content-text-title'], {
                            [styles.darkTitle]: themeValue === Theme.Dark,
                        })}
                        >{title}</h2>
                        {type === CardPostTypes.Large && (
                            <div className={styles['content-text-description']}>{text}</div>
                        )}
                    </div>
                    <div className={styles['content-img']}>
                        <img src={image} alt="#" />
                    </div>
                </div>
                <div className={styles['icons']}>
                    <div className={classNames(styles['icons-like'], {
                        [styles.darkIconsLike]: themeValue === Theme.Dark,
                    })}
                    >
                        <LikeIcon />
                        <DislikeIcon />
                    </div>
                    <div className={classNames(styles['icons-book'], {
                        [styles.darkIconsBook]: themeValue === Theme.Dark,
                    })}
                    >
                        <BookmarkIcon />
                        {onMoreClick && (
                            <div onClick={onMoreClick}>
                                <MoreIcon />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Card;
