import React, { FC } from "react";


import {PostsList} from "src/@types";

import Card, { CardPostTypes } from "../CardPost";
import styles from "./CardsList.module.scss";
import Loader from "src/components/Loader";
import {useCardActions} from "src/hooks";
import EmptyState from "src/components/EmptyState";

type CardsListProps = {
  cardsList: PostsList;
  isLoading: boolean;
};

const CardsList: FC<CardsListProps> = ({ cardsList, isLoading }) => {

  const {
    onSaveClick,
    onImageClick,
    onStatusClick: onClickStatus,   // если надо переименовать функуию
    onMoreClick,
  } = useCardActions();

  if (isLoading) {
    return  <Loader />
  }

  return cardsList.length ? (
    <div className={styles.cardListContainer}>
      <div className={styles.cardListWrap}>
        <Card
          type={CardPostTypes.Large}
          {...cardsList[0]}
          onMoreClick={onMoreClick(cardsList[0])}
          onImageClick={onImageClick(cardsList[0].image)}
          onStatusClick={onClickStatus(cardsList[0])}
          onSaveClick={onSaveClick(cardsList[0])}
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
                  onStatusClick={onClickStatus(el)}
                  onSaveClick={onSaveClick(el)}
                />
              );
            } else {
              return null;
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
                onStatusClick={onClickStatus(el)}
                onSaveClick={onSaveClick(el)}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  ) : <EmptyState title="There is no posts" description="Create a new one!" />
};

export default CardsList;
