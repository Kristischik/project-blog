import React, {useEffect, useState} from "react";

import FormPagesContainer from "src/components/FormPagesContainer";
import classNames from "classnames";
import styles from "./ResetPassword.module.scss";
import Input from "src/components/Input";
import {useNavigate} from "react-router-dom";
import {RoutesList} from "src/pages/Router";
import {useDispatch} from "react-redux";
import {resetPassword} from "src/redux/reducers/authSlice";



const ResetPassword = () => {

  const [email, setEmail] = useState("")
  const [isSent, setSent] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = () => {
  if(isSent) {
    navigate(RoutesList.SignIn)
    } else {
    dispatch(resetPassword({ data: email, callback: () => setSent(true)}));
    }
  }

  return (
    <FormPagesContainer
      title={"ResetPassword"}
      btnTitle={isSent ? "Go to Sigh In" : "Reset"}
      onSubmit={onSubmit}
    >
      <div className={classNames(styles.additionalInfo)}>
        {isSent &&
          `You will receive an email ${email} with a link to reset your password!`}
        <Input
          title={"Email"}
          placeholder={"Your email"}
          onChange={setEmail}
          value={email}
        />
      </div>
    </FormPagesContainer>
  );
};

export default ResetPassword;