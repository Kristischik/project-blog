import React, { FC, ReactElement } from "react";
import classNames from "classnames";
import Title from "../Title";
import styles from "./FormPagesContainer.module.scss";
import Button, { ButtonTypes } from "../Button";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

type FormPagesContainerProps = {
  title: string;
  children: ReactElement | ReactElement[];
  btnTitle: string;
  onSubmit: () => void;
  additionalInfo?: ReactElement;
  isSubmitDisabled?: boolean;
};

const FormPagesContainer: FC<FormPagesContainerProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
  additionalInfo,
  isSubmitDisabled,
}) => {
  const { themeValue } = useThemeContext();

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div className={styles.breadcrumbs}>Back to home</div>
      <Title title={title} />
      <div className={styles.formContainer}>
        <div className={styles.fieldsContainer}>{children}</div>
        <Button
          type={ButtonTypes.Primary}
          title={btnTitle}
          onClick={onSubmit}
          className={styles.button}
          disabled={isSubmitDisabled}
        />
        <div>{additionalInfo}</div>
      </div>
    </div>
  );
};

export default FormPagesContainer;
