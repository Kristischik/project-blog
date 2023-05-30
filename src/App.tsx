import React, { useState } from "react";
import Button, {ButtonTypes} from "./components/Button";
import Title from "./components/Title";
import TabsList from './components/TabsList';
import CardsList from "./components/CardsList";
import Input from "./components/Input";
import Username from "./components/Username";
import SignUp from "./pages/SignUp";
import RegistrationConfirmation from "./pages/RegistrationConfirmation";

const App = () => {

    // Константы для Input
    const [inputValue, setInputValue] = useState("");
    const onChange = (value: string) => {
        setInputValue(value);
    };

    return (
    <div>
      <Button
        type={ButtonTypes.Primary}
        title={"Primary"}
        onClick={() => {
          alert("Primary");
        }}
      />
      <Button
        type={ButtonTypes.Secondary}
        title={"Secondary"}
        onClick={() => {
          alert("Secondary");
        }}
      />
      <Button
        type={ButtonTypes.Error}
        title={"Error"}
        onClick={() => {
          alert("Error");
        }}
      />

        <Title title={"Sign In"} />

        <TabsList />

        <CardsList />

        <Input
            isTextarea
            title={"Test Input"}
            placeholder={"Hello World!"}
            onChange={onChange}
            value={inputValue}
        />

        <Username username={"Kristina"} />

        <SignUp />
        <RegistrationConfirmation />


    </div>
  );
};

export default App;