import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/redux/store";


type InitialState = {
    isSelectedImageModalOpened: boolean;
    selectedImage: string,
}

const initialState: InitialState = {
    isSelectedImageModalOpened: false,
    selectedImage: '',
};

const imageSlice = createSlice({
    name: "imageReducer",
    initialState,
    reducers: {
        setSelectedImageModalOpened: (state, action: PayloadAction<boolean>) => {
            state.isSelectedImageModalOpened = action.payload; //тут данные ловятся и кладутся на нужное место
        },
        setSelectedImage: (state, action: PayloadAction<string>) => {
            state.selectedImage = action.payload;
        },
    }, // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});

export const { setSelectedImageModalOpened, setSelectedImage } =
    imageSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит

export const ImageSelectors = {
    getSelectedImageModalOpened: (state: RootState) =>
        state.imageReducer.isSelectedImageModalOpened,
    getSelectedImage: (state: RootState) => state.imageReducer.selectedImage,
};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)

export default imageSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)