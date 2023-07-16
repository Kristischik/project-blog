import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/redux/store";
import { LikeStatus, Post, PostsList } from "src/@types";
import {GetPostsPayload, GetSearchedPostsPayload, SetPostsListPayload, SetSearchedPostsPayload} from "src/redux/@types";

type InitialState = {
  isSelectedPostModalOpened: boolean;
  selectedPost: Post | null;
  likedPosts: PostsList;
  dislikedPosts: PostsList;
  savedPosts: PostsList;
  postsList: PostsList;
  singlePost: Post | null;
  singlePostLoading: boolean;
  myPosts: PostsList,
  searchedPosts: PostsList,
  totalCount: number;
  isPostsListLoading: boolean;
  totalSearchedCount: number;
};

const initialState: InitialState = {
  isSelectedPostModalOpened: false,
  selectedPost: null,
  likedPosts: [],
  dislikedPosts: [],
  savedPosts: [],
  postsList: [],
  singlePost: null,
  singlePostLoading: false,
  myPosts: [],
  searchedPosts: [],
  totalCount: 0,
  isPostsListLoading: false,
  totalSearchedCount: 0,
};

const postSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setSelectedPostModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isSelectedPostModalOpened = action.payload; //тут данные ловятся и кладутся на нужное место
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setLikeStatus: (
      state,
      action: PayloadAction<{ card: Post; status: LikeStatus }>
    ) => {
      const { card, status } = action.payload;
      const likedIndex = state.likedPosts.findIndex(
        (item) => item.id === card.id
      );
      const disLikedIndex = state.dislikedPosts.findIndex(
        (item) => item.id === card.id
      );
      const isLike = status === LikeStatus.Like;
      const mainKey = isLike ? "likedPosts" : "dislikedPosts";
      const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";
      const mainIndex = isLike ? likedIndex : disLikedIndex;
      const secondaryIndex = isLike ? disLikedIndex : likedIndex;
      if (mainIndex === -1) {
        state[mainKey].push(card);
      } else {
        state[mainKey].splice(mainIndex, 1);
      }
      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1);
      }
    },
    setSaveStatus: (state, action: PayloadAction<{ card: Post }>) => {
      const { card } = action.payload;
      const savedIndex = state.savedPosts.findIndex(
        (item) => item.id === card.id
      );
      if (savedIndex === -1) {
        state.savedPosts.push(card);
      } else state.savedPosts.splice(savedIndex, 1);
    },

    // getPostsList: (_, __: PayloadAction<undefined>) => {},
    // setPostsList: (state, action: PayloadAction<PostsList>) => {
    //   state.postsList = action.payload;
    // },

    getSinglePost: (_, __: PayloadAction<string>) => {},
    setSinglePostLoading: (state, action: PayloadAction<boolean>) => {
      state.singlePostLoading = action.payload;
    },
    setSinglePost: (state, action: PayloadAction<Post | null>) => {
      state.singlePost = action.payload;
    },

    getMyPosts: (_, __: PayloadAction<undefined>) => { },
    setMyPosts: (state, action: PayloadAction<PostsList>) => {
      state.myPosts = action.payload;
    },

      getSearchedPosts: (_, __: PayloadAction<GetSearchedPostsPayload>) => {},
        setSearchedPosts: (
        state,
        action: PayloadAction<SetSearchedPostsPayload>
      ) => {
        const { total, postsList } = action.payload;
        state.totalSearchedCount = total;
        state.searchedPosts.push(...postsList);
      },
        clearSearchedPosts: (state) => {
        state.searchedPosts = [];
    },

    getPostsList: (_, __: PayloadAction<GetPostsPayload>) => {},
    setPostsList: (state, action: PayloadAction<SetPostsListPayload>) => {
      const { total, isOverwrite, postsList } = action.payload;
      state.totalCount = total;
      if (isOverwrite) {
        state.postsList = postsList;
      } else {
        state.postsList.push(...postsList);
      }
    },
    setPostsListLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostsListLoading = action.payload;
    },

  }, // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});

export const {
  setSelectedPostModalOpened,
  setSelectedPost,
  setLikeStatus,
  setSaveStatus,
  // setPostsList,
  // getPostsList,
  getSinglePost,
  setSinglePost,
  setSinglePostLoading,
  getMyPosts,
  setMyPosts,
  getSearchedPosts,
  setSearchedPosts,
  getPostsList,
  setPostsList,
  setPostsListLoading,
  clearSearchedPosts,
} = postSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedPostModalOpened,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  getLikedPosts: (state: RootState) => state.postReducer.likedPosts,
  getDislikedPosts: (state: RootState) => state.postReducer.dislikedPosts,
  getSavedPosts: (state: RootState) => state.postReducer.savedPosts,
  // getPostsList: (state: RootState) => state.postReducer.postsList,
  getSinglePost: (state: RootState) => state.postReducer.singlePost,
  getSinglePostLoading: (state: RootState) =>
    state.postReducer.singlePostLoading,
  getMyPosts: (state: RootState) => state.postReducer.myPosts,
  getSearchedPosts: (state: RootState) => state.postReducer.searchedPosts,
  getPostsListLoading: (state: RootState) =>
    state.postReducer.isPostsListLoading,
  getPostsList: (state: RootState) => state.postReducer.postsList,
  getTotalPostsCount: (state: RootState) => state.postReducer.totalCount,
  getTotalSearchedPosts: (state: RootState) =>
    state.postReducer.totalSearchedCount,

};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)

export default postSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)
