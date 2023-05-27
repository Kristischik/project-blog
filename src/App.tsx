import React from "react";
import Button, { ButtonTypes } from "./components/Button";
import Title from "./components/Title";
import TabsList from './components/TabsList';

const App = () => {
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

    </div>
  );
};

export default App;