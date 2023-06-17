import React from "react";

import FormPagesContainer from "src/components/FormPagesContainer";
import {useThemeContext} from "src/context/Theme";
import classNames from "classnames";
import styles from "./Success.module.scss"
import {Theme} from "src/@types";

const Success = () => {
    const { themeValue } = useThemeContext();

    return (
        <FormPagesContainer
            title={"Success"}
            btnTitle={"Go to home"}
            onSubmit={() => {}}
        >
            <div className={classNames(styles.additionalInfo, {
                [styles.darkAdditionalInfo]: themeValue === Theme.Dark,
            })}>
                {
                    "Email confirmed.\n Your registration is now completed"
                }
            </div>
        </FormPagesContainer>
    );
};

export default Success;