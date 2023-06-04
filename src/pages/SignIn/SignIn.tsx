import React, { useState } from "react";
import FormPagesContainer from "../../components/FormPagesContainer";
import Input from "../../components/Input";
import styles from "./SignIn.module.scss";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <FormPagesContainer
            title={"Sign In"}
            btnTitle={"Sign In"}
            onSubmit={() => {}}
            additionalInfo={
                <div className={styles.additionalInfo}>
                    {"Don’t have an account?"}
                    <span className={styles.signUp}>Sign Up</span>
                </div>
            }
        >

            <Input
                title={"Email"}
                placeholder={"Your email"}
                onChange={setEmail}
                value={email}
            />
            <Input
                title={"Password"}
                placeholder={"Your password"}
                onChange={setPassword}
                value={password}
            />
            <div className={styles.forgotPassword}>
                {"Forgot password?"}
            </div>
        </FormPagesContainer>
    );
};

export default SignIn;