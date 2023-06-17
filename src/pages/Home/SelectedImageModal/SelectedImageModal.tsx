import React from 'react';
import Modal from "src/components/Modal";
import {useDispatch, useSelector} from "react-redux";
import {ImageSelectors, setSelectedImage, setSelectedImageModalOpened} from "src/redux/reducers/imageSlice";

const SelectedImageModal = () => {
   const isOpened = useSelector(ImageSelectors.getSelectedImageModalOpened)
    const selectedImage = useSelector(ImageSelectors.getSelectedImage)
    const dispatch = useDispatch()
    const onCloseModal = () => {
        dispatch(setSelectedImageModalOpened(false))
        dispatch(setSelectedImage(''))
    }


    return <Modal isOpen={isOpened} onClose={onCloseModal}>
        <img src={selectedImage}  alt="#"/>
    </Modal>
}

export default SelectedImageModal