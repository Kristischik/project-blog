import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedPosts, PostSelectors } from "src/redux/reducers/postSlice";
import Title from "src/components/Title";

import { useCardActions } from "src/hooks";
import styles from "./Search.module.scss";

import EmptyState from "src/components/EmptyState";
import CardPost, {CardPostTypes} from "src/components/CardPost";
const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);
  const {onSaveClick, onImageClick, onStatusClick, onMoreClick} = useCardActions()
  useEffect(() => {
    if (!search) {
      navigate(RoutesList.Home);
    } else {
      dispatch(getSearchedPosts(search));
    }
  }, [dispatch, navigate, search]);
  return (
    <div>
      <Title title={`Search results: "${search}"`} />
      <div className={styles.container}>
        {searchedPosts.length ? (
          <>
            {searchedPosts.map((post) => {
              return (
                <CardPost
                  key = {post.id}
                  type={CardPostTypes.Search}
                  onStatusClick={onStatusClick(post)}
                  onSaveClick={onSaveClick(post)}
                  onImageClick={onImageClick(post.image)}
                  onMoreClick={onMoreClick(post)}
                  {...post}
                />
              );
            })}
          </>
        ) : (
          <EmptyState
            title={"Nothing was found..."}
            description={"Try another search request"}
          />
        )}
      </div>
    </div>
  );
};

export default Search;