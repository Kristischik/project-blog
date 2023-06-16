import React from "react";

// import Button, {ButtonTypes} from "./components/Button";
// import Input from "./components/Input";
// import SelectedPost from "./pages/SelectedPost";
import {ThemeProvider} from "src/context/Theme";
// import ThemeSwitcher from "src/components/ThemeSwitcher";
import {Theme} from "src/@types";
import Router from "src/pages/Router";
import { useDispatch, useSelector } from "react-redux";
import { setThemeValue, ThemeSelectors } from "src/redux/reducers/themeSlice";

const App = () => {

    // // Константы для Input
    // const [inputValue, setInputValue] = useState("");
    // const onChange = (value: string) => {
    //     setInputValue(value);
    // };

    // // Темная и светлая темы Контекст
    // const [themeValue, setThemeValue] = useState<Theme>(Theme.Light);
    //
    // const onChangeTheme = (value: Theme) => () => {
    //     setThemeValue(value);
    // };

    //Используем Redux
    const dispatch = useDispatch();

    //то, что данные из редакса достает
    const themeValue = useSelector(ThemeSelectors.getThemeValue);
    const onChangeTheme = (value: Theme) => () => {
        dispatch(setThemeValue(value)); // то, что швыряет в редакс данные
    };


    return (

        <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
            <Router />
        </ThemeProvider>




        // // Использование контекста для темной темы
        // <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        //     <Router />
        // </ThemeProvider>


    // <div>
    //   <Button
    //     type={ButtonTypes.Primary}
    //     title={"Primary"}
    //     onClick={() => {
    //       alert("Primary");
    //     }}
    //   />
    //   <Button
    //     type={ButtonTypes.Secondary}
    //     title={"Secondary"}
    //     onClick={() => {
    //       alert("Secondary");
    //     }}
    //   />
    //   <Button
    //     type={ButtonTypes.Error}
    //     title={"Error"}
    //     onClick={() => {
    //       alert("Error");
    //     }}
    //   />
    //
    //     <Input
    //         isTextarea
    //         title={"Test Input"}
    //         placeholder={"Hello World!"}
    //         onChange={onChange}
    //         value={inputValue}
    //     />
    //
    //
    // <SelectedPost
    //     image={'https://static.euronews.com/articles/stories/07/49/90/02/773x435_cmsv2_0873e053-ec92-5626-b060-8e1d63adcd7e-7499002.jpg'}
    //     text={
    //         'Европейские самолеты пересекают в небе десятки границ: авиакомпании хотят упростить путешествия и рассчитывают на "Единое европейское небо". По словам представителей авиационной промышленности, "Единое европейское небо" может сократить выбросы и уменьшить задержки.Но что это такое и насколько эффективным и экологичным оно будет на самом деле?По словам представителей авиационной промышленности, "Единое европейское небо" может сократить выбросы и уменьшить задержки. ' +
    //         'Но что это такое и насколько эффективным и экологичным оно будет на самом деле?' +
    //         'На саммите Airlines for Europe (A4E) в среду компании Ryan-air, Easyjet, Lufthansa и владелец British Airways IAG призвали ЕС провести реформу воздушного пространства.' +
    //         'Законодательство о "Едином европейском небе" (SES) позволит упорядочить разрозненное воздушное пространство континента, объединив его в небольшое количество блоков.' +
    //         'После ослабления ограничений, введенных в период пандемии, путешествия возобновились, что сделало эту проблему "более актуальной, чем когда-либо", отметили авиакомпании в совместном заявлении.' +
    //         'Так как же это будет работать?'}
    //     title={'Как упростить авиапутешествия по Европе'}></SelectedPost>
    //
    // </div>



  );
};

export default App;