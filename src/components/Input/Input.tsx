import React, { ChangeEvent, FC } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import {useThemeContext} from "src/context/Theme";
import {Theme} from "src/@types";

type InputProps = {
    title: string;
    placeholder: string;
    onChange: (value: string) => void;
    value: string;
    disabled?: boolean;
    errorText?: string;
    isTextarea?: boolean;
};

const Input: FC<InputProps> = ({
                                   title,
                                   errorText,
                                   placeholder,
                                   onChange,
                                   disabled,
                                   value,
                                   isTextarea,
                               }) => {

    const { themeValue } = useThemeContext();
    const onInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange(event.target.value);
    };

    const inputProps = {
        onChange: onInputChange,
        value,
        placeholder,
        className: classNames(styles.input, {
            [styles.disabled]: disabled,
            [styles.errorInput]: errorText,
        }),
    };

    return (
        <div  className={classNames(styles.container, {
            [styles.darkContainer]: themeValue === Theme.Dark,
        })}>
            <div className={styles.title}>{title}</div>
            {isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
            {errorText && <div className={styles.errorText}>{errorText}</div>}
        </div>
    );
};

export default Input;