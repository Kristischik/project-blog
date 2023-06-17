import React from "react";

import FormPagesContainer from "src/components/FormPagesContainer";
import classNames from "classnames";
import styles from "./RegistrationConfirmation.module.scss";
import {Theme} from "src/@types";
import {useThemeContext} from "src/context/Theme";

const RegistrationConfirmation = () => {
    const { themeValue } = useThemeContext();

    return (
        <FormPagesContainer
            title={"Registration Confirmation"}
            btnTitle={"Go to home"}
            onSubmit={() => {}}
        >
            <div className={classNames(styles.additionalInfo, {
                [styles.darkAdditionalInfo]: themeValue === Theme.Dark,
            })}>
                {
                    "Please activate your account with the activation link in the email example@gmail.com.\n Please, check your email"
                }
            </div>
        </FormPagesContainer>
    );
};

export default RegistrationConfirmation;