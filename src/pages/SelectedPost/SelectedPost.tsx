import React, { FC } from "react";

import styles from "./SelectedPost.module.scss";
import {BookmarkIcon, DislikeIcon, LikeIcon} from "src/assets/icons";
import Title from "../../components/Title";

type CardPostProps =
{
    image: string;
    text: string;
    title: string;
};

const SelectedPost: FC<CardPostProps> = ({
                                     image,
                                     text,
                                     title,
                                 }) => {

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumbs}>
                <span className={styles.link}>Home&nbsp;</span>
                <span>| Post 11111</span>
            </div>
            <Title title={title} />
            <div className={styles.postPicture}>
                <img src={image} alt="#" />
            </div>
            <div className={styles.postText}>
                <p >{text}</p>
            </div>
            <div className={styles.iconsContainer}>
                <div className={styles.iconsLeft}>
                    <div className={styles.iconLike}><LikeIcon /></div>
                    <div className={styles.iconDislike}><DislikeIcon /></div>
                </div>
                <div className={styles.iconRight}>
                    <BookmarkIcon />Add to favorites
                </div>
            </div>
        </div>

    )
};

export default SelectedPost;