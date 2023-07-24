import React, { useEffect, useMemo, useState } from "react";

import FormPagesContainer from "src/components/FormPagesContainer";
import classNames from "classnames";

import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  activateUser,
  resetPasswordConfirm,
} from "src/redux/reducers/authSlice";
import { RoutesList } from "src/pages/Router";
import Input from "src/components/Input";

const ResetPasswordConfirmation = () => {
  const { themeValue } = useThemeContext();

  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isTouched, setTouched] = useState({
    passwordField: false,
    confirm: false,
  });

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        resetPasswordConfirm({
          data: { uid, token, new_password: password },
          callback: () => {
            navigate(RoutesList.SignIn);
          },
        })
      );
    }
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
    setTouched((prevState) => ({ ...prevState, passwordField: true }));
  };
  const onChangePasswordConfirm = (value: string) => {
    setConfirmPassword(value);
    setTouched((prevState) => ({ ...prevState, confirm: true }));
  };

  useEffect(() => {
    if (isTouched.passwordField && isTouched.confirm) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords Must Match");
      } else if (password.length < 8 || confirmPassword.length < 8) {
        setPasswordError("Passwords length should be more than 8 characters");
      } else {
        setPasswordError("");
      }
    }
  }, [password, confirmPassword, isTouched.passwordField, isTouched.confirm]);

  const isSubmitValid = useMemo(
    () =>
      isTouched.passwordField &&
      isTouched.confirm &&
      password.length &&
      confirmPassword.length &&
      !passwordError.length,
    [
      password,
      confirmPassword,
      isTouched.passwordField,
      isTouched.confirm,
      passwordError,
    ]
  );

  return (
    <FormPagesContainer
      title={"New Password"}
      btnTitle={"Set Password"}
      isSubmitDisabled={!isSubmitValid}
      onSubmit={onSubmit}
    >
      <div>
        <Input
          title={"Password"}
          placeholder={"Your password"}
          onChange={onChangePassword}
          value={password}
          errorText={passwordError}
        />
        <Input
          title={"Confirm Password"}
          placeholder={"Confirm password"}
          onChange={onChangePasswordConfirm}
          value={confirmPassword}
          errorText={passwordError}
        />
      </div>
    </FormPagesContainer>
  );
};

export default ResetPasswordConfirmation;
