import {useEffect, useMemo, useState} from "react";

import Title from "../../components/Title";
import CardsList from "../../components/CardsList";
import {Ordering, TabsTypes, Theme} from "src/@types";
import TabsList from "../../components/TabsList";
import styles from "./Home.module.scss";
import {useThemeContext} from "src/context/Theme";
import classNames from "classnames";
import SelectedPostModal from "src/pages/Home/SelectedPostModal";
import SelectedImageModal from "src/pages/Home/SelectedImageModal";
import {getMyPosts, getPostsList, PostSelectors,} from "src/redux/reducers/postSlice";
import {useDispatch, useSelector} from "react-redux";
import {AuthSelectors} from "src/redux/reducers/authSlice";
import {PER_PAGE} from "src/utils/constants";
import Pagination from "src/components/Pagination";
import Button, {ButtonTypes} from "src/components/Button";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.All);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  // const [cardsList, setCardsList] = useState<PostsList>([]);

  const dispatch = useDispatch();
  // const cardsList = useSelector(PostSelectors.getPostsList)

  const tabsList = useMemo(
    () => [
      { key: TabsTypes.All, title: "All Posts", disabled: false },
      { key: TabsTypes.Favourite, title: "Favourite Posts", disabled: false },
      {
        key: TabsTypes.MyPosts,
        title: "My Posts",
        disabled: !isLoggedIn,
      },
    ],
    [isLoggedIn]
  );

  const cardsList = useSelector(PostSelectors.getPostsList);
  const totalCount = useSelector(PostSelectors.getTotalPostsCount);
  const isListLoading = useSelector(PostSelectors.getPostsListLoading);

  //текущая страница, на которой мы находимся
  const [currentPage, setCurrentPage] = useState(1);

  //сколько итого у нас страниц
  const pagesCount = useMemo(
    () => Math.ceil(totalCount / PER_PAGE),
    [totalCount]
  );

  //для сортировки постов
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    // сколько надо пропустить постов (сколько мы уже посмотрели)
    if (activeTab === TabsTypes.MyPosts) {
      dispatch(getMyPosts());
    } else {
      const offset = (currentPage - 1) * PER_PAGE;
      dispatch(getPostsList({ offset, isOverwrite: true, ordering }));
    }
  }, [currentPage, dispatch, ordering, activeTab]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  // useEffect(() => {
  //     dispatch(getPostsList());
  // }, [])

  // useEffect(() => {
  //   if (activeTab === TabsTypes.MyPosts) {
  //     dispatch(getMyPosts());
  //   } else {
  //     dispatch(getPostsList());
  //   }
  // }, [activeTab]);

  const onTabClick = (tab: TabsTypes) => () => {
    setActiveTab(tab);
    // if (tab === TabsTypes.Popular) {
    //     setLoggedIn(true);
    // }
  };

  const SortButtonClick = (order: Ordering) => () => {
    if (order === ordering) {
      setOrdering("");
      setCurrentPage(1);
    } else {
      setOrdering(order);
    }
  };

  const allPosts = useSelector(PostSelectors.getPostsList)
  const myPosts = useSelector(PostSelectors.getMyPosts)
  const favouritePosts = useSelector(PostSelectors.getSavedPosts)
  const tabsSwitcher = () => {
      switch (activeTab) {
          case TabsTypes.MyPosts:
              return myPosts;
        case TabsTypes.Favourite:
          return favouritePosts;
          default: return allPosts;
      }
  }

  const { themeValue } = useThemeContext();

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <Title title={"Blog"} className={styles.pageTitle} />
      <TabsList
        tabsList={tabsList}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />

      {activeTab === TabsTypes.All &&
        <div className={styles.sortButtonContainer}>
          <Button
            className={classNames(styles.sortButton, {
              [styles.activeButton]: ordering === Ordering.Date,
            })}
            type={ButtonTypes.Primary}
            title={"Sort for Date"}
            onClick={SortButtonClick(Ordering.Date)}
          />
          <Button
            className={classNames(styles.sortButton, {
              [styles.activeButton]: ordering === Ordering.Title,
            })}
            type={ButtonTypes.Primary}
            title={"Sort for Title"}
            onClick={SortButtonClick(Ordering.Title)}
          />
        </div>
      }

      {/*<CardsList cardsList={cardsList} />*/}
      {/*<CardsList cardsList={tabsSwitcher()} />*/}
      <CardsList cardsList={tabsSwitcher()} isLoading={isListLoading} />
      {activeTab === TabsTypes.All &&<Pagination
        currentPage={currentPage}
        pagesCount={pagesCount}
        onPageChange={onPageChange}
      />}
      <SelectedPostModal />
      <SelectedImageModal />
    </div>
  );
};

export default Home;
