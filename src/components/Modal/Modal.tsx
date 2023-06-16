
import React, { FC } from "react";
import ReactModal from "react-modal";
import { Children } from "src/@types";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: Children;
};
const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose}>
            {children}
        </ReactModal>
    );
};

export default Modal;