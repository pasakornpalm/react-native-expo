import React from "react";
import MyStack from "./components/MyStack";
import registerNNPushToken from "native-notify";

const App = () => {
  registerNNPushToken(12543, "TgLzMcJg4xD75FLd7KI7Ai");
  return <MyStack></MyStack>;
};

export default App;
