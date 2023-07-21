import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Title from "src/components/Title";
import Input from "src/components/Input";
import Button, {ButtonTypes} from "src/components/Button";
import {RoutesList} from "src/pages/Router";
import classNames from "classnames";

import styles from './AddPost.module.scss'
import {addNewPost} from "src/redux/reducers/postSlice";

const AddPost = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [title, setTitle] = useState('')
  const [lessonNumber, setLessonNumber] = useState('')
  const [description, setDescription] = useState('')
  const [text, setText] = useState('')
  const [images, setImages] = useState<ImageListType>([]);
  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    setImages(imageList);
  };

  const onNavigateToHome = () => {
    navigate(RoutesList.Home)
  }

  const onSubmit = () => {
    const formData = new FormData()
    formData.append("title", title);
    formData.append("text", text);
    formData.append("description", description);
    formData.append("lesson_num", lessonNumber);
    formData.append("image", images[0].file as Blob);
    dispatch(addNewPost({
      data: formData, callback: onNavigateToHome
    }))
  }

  return (
    <>
      <Title title={'Add post'} />

      <Input title={'Title'} placeholder={'Что-то на Титульном'} onChange={setTitle} value={title} />
      <div>
        <Input title={'Lesson number'} placeholder={'Что-то на Намбере'} onChange={setLessonNumber} value={lessonNumber} />


        <ImageUploading
          value={images}
          onChange={onChange}
          dataURLKey="imageData"
        >
          {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
            <div className="upload__image-wrapper">
              {!imageList.length && <div className={classNames(styles.uploadImage, { [styles.uploadDragging]: isDragging })}
                                         onClick={onImageUpload}
                                         {...dragProps}
              >
                  Click or Drop here
              </div>}
              {!!imageList.length && <Button title={'Remove all images'} type={ButtonTypes.Primary} onClick={onImageRemoveAll} />}

              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['imageData']} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <Button title={'Remove'} type={ButtonTypes.Primary} onClick={() => onImageRemove(index)} />
                    <Button title={'Update '} type={ButtonTypes.Primary} onClick={() => onImageUpdate(index)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>


      </div>
      <Input isTextarea title={'Description'} placeholder={'Что-то на Description'} onChange={setDescription} value={description} />
      <Input isTextarea title={'Text'} placeholder={'Add your text'} onChange={setText} value={text} />

      <div>
        <Button type={ButtonTypes.Error} title={'Delete post'} onClick={() => { }} />
        <div>
          <Button type={ButtonTypes.Secondary} title={'Cancel'} onClick={onNavigateToHome} />
          <Button type={ButtonTypes.Primary} title={'Add post'} onClick={onSubmit} />

        </div>
      </div>
    </>
  );

}

export default AddPost;
