import { createContext, useContext } from "react";
import { Theme } from "src/@types";

const initialValues = {
    themeValue: Theme.Light,
    onChangeTheme: (_: Theme) => () => {},
};

const ThemeContext = createContext(initialValues);

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;