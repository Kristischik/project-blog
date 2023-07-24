import React, {useState} from "react";

import FormPagesContainer from "src/components/FormPagesContainer";
import classNames from "classnames";

import {Theme} from "src/@types";
import {useThemeContext} from "src/context/Theme";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {activateUser, resetPasswordConfirm} from "src/redux/reducers/authSlice";
import {RoutesList} from "src/pages/Router";
import Input from "src/components/Input";

const ResetPasswordConfirmation = () => {
  const { themeValue } = useThemeContext();

  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        resetPasswordConfirm({
          data: { uid, token, new_password: password },
          callback: () => {
            navigate(RoutesList.SignIn)
          },
        })
      );
    }
  };

  return (
    <FormPagesContainer
      title={"New Password"}
      btnTitle={"Set Password"}
      onSubmit={onSubmit}
    >
      <div>
        <Input
          title={"Password"}
          placeholder={"Your password"}
          onChange={setPassword}
          value={password}
        />
        <Input
          title={"Confirm Password"}
          placeholder={"Confirm password"}
          onChange={setConfirmPassword}
          value={confirmPassword}
        />
      </div>
    </FormPagesContainer>
  );
};

export default ResetPasswordConfirmation;