
import {LikeStatus, Post} from "src/@types";
import {setLikeStatus, setSaveStatus, setSelectedPost, setSelectedPostModalOpened} from "src/redux/reducers/postSlice";
import {setSelectedImage, setSelectedImageModalOpened} from "src/redux/reducers/imageSlice";
import {useDispatch} from "react-redux";

const useCardActions = () => {
  const dispatch = useDispatch()
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
  return {onSaveClick, onImageClick, onStatusClick, onMoreClick}
}

export default useCardActions