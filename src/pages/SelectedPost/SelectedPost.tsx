import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import styles from "./SelectedPost.module.scss";
import {BookmarkIcon, DislikeIcon, LikeIcon} from "src/assets/icons";
import Title from "src/components/Title";
import {useThemeContext} from "src/context/Theme";
import classNames from "classnames";
import {Theme} from "src/@types";
import {getSinglePost, PostSelectors} from "src/redux/reducers/postSlice";
import {RoutesList} from "src/pages/Router";
import Loader from "src/components/Loader";
import Button, {ButtonTypes} from "src/components/Button";
import {AuthSelectors} from "src/redux/reducers/authSlice";


const SelectedPost = () => {

    const { themeValue } = useThemeContext();

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector(AuthSelectors.getUserInfo);

    const singlePost = useSelector(PostSelectors.getSinglePost);
    const isSinglePostLoading = useSelector(PostSelectors.getSinglePostLoading);

    useEffect(() => {
        if (id) {
            dispatch(getSinglePost(id));
        }
    }, [dispatch, id]);

    const onHomeClick = () => {
        navigate(RoutesList.Home);
    };

    const onClickEdit = () => {
        navigate(`/posts/${singlePost?.id}/edit`);
    };

    return singlePost && !isSinglePostLoading  ? (

        <div className={classNames(styles.container, {
            [styles.darkContainer]: themeValue === Theme.Dark,
        })}>
            <div className={styles.breadcrumbs}>
                <span className={styles.link} onClick={onHomeClick}>Home&nbsp;</span>
                <span>| Post {singlePost.id}</span>
            </div>
            <Title title={singlePost.title} />
            <div className={styles.postPicture}>
                <img src={singlePost.image} alt="#" />
            </div>
            <div className={styles.postText}>
                <p >{singlePost.text}</p>
            </div>
            <div className={styles.iconsContainer}>
                <div className={styles.iconsLeft}>
                    <div className={styles.iconLike}><LikeIcon /></div>
                    <div className={styles.iconDislike}><DislikeIcon /></div>
                </div>
                <div className={styles.iconRight}>
                    <BookmarkIcon />Add to favorites
                </div>
                {singlePost.author === userInfo?.id && (
                  <Button
                    type={ButtonTypes.Secondary}
                    title={"Edit post"}
                    onClick={onClickEdit}
                  />
                )}
            </div>
        </div>

    ) : <Loader />
};

export default SelectedPost;