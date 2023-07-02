import React, { FC } from "react";
import classNames from "classnames";
import styles from "./CardPost.module.scss";
import {
  BookmarkIcon, BookmarkIconSaved,
  DislikeIcon,
  LikeIcon,
  MoreIcon,
} from "src/assets/icons";
import { useThemeContext } from "src/context/Theme";
import {LikeStatus, Post, Theme} from "src/@types";
import { useSelector } from "react-redux";
import { PostSelectors } from "src/redux/reducers/postSlice";
import { useNavigate } from "react-router-dom";

export enum CardPostTypes {
  Large = "large",
  Medium = "medium",
  Small = "small",
}

interface CardPostProps extends Post {
  type: CardPostTypes;
  onMoreClick?: () => void;
  onImageClick?: () => void;
  onStatusClick: (status: LikeStatus) => void;
  onSaveClick?: () => void;
}

const Card: FC<CardPostProps> = ({
  type,
  date,
  title,
  text,
  image,
  onMoreClick,
  onImageClick,
  onStatusClick,
  onSaveClick,
  id,
}) => {
  const cardStyle = styles[type];
  const { themeValue } = useThemeContext();
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const likedIndex = likedPosts.findIndex((item) => item.id === id);
  const dislikedIndex = dislikedPosts.findIndex((item) => item.id === id);
  const savedPosts = useSelector(PostSelectors.getSavedPosts);
  const savedIndex = savedPosts.findIndex((item) => item.id === id);

  const navigate = useNavigate();

  const onTitleClick = () => {
    navigate(`/post/${id}`);
  };


  return (
    <div>
      <div className={classNames(cardStyle)}>
        <div className={styles["content"]}>
          <div className={styles["content-text"]}>
            <span className={styles["content-text-date"]}>{date}</span>
            <h2
              className={classNames(styles["content-text-title"], {
                [styles.darkTitle]: themeValue === Theme.Dark,
              })}
              onClick={onTitleClick}
            >
              {title}
            </h2>
            {type === CardPostTypes.Large && (
              <div className={styles["content-text-description"]}>{text}</div>
            )}
          </div>
          <div className={styles["content-img"]}>
            <img onClick={onImageClick} src={image} alt="#" />
          </div>
        </div>
        <div className={styles["icons"]}>
          <div
            className={classNames(styles["icons-like"], {
              [styles.darkIconsLike]: themeValue === Theme.Dark,
            })}
          >
            <div onClick={() => onStatusClick(LikeStatus.Like)}>
              <LikeIcon /> {likedIndex > -1 && <span className={styles["count-likes"]}>1</span>}
            </div>
            <div onClick={() => onStatusClick(LikeStatus.Dislike)}>
              <DislikeIcon /> {dislikedIndex > -1 && <span className={styles["count-likes"]}>1</span>}
            </div>
          </div>
          <div
            className={classNames(styles["icons-book"], {
              [styles.darkIconsBook]: themeValue === Theme.Dark,
            })}
          >
            <div onClick={onSaveClick}>
              {savedIndex > -1 ? <BookmarkIconSaved /> : <BookmarkIcon/>}
            </div>
            {onMoreClick && (
              <div onClick={onMoreClick}>
                <MoreIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
