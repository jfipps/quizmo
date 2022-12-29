import React, { useContext } from "react";
import "./App.css";
import { QuizmoContext } from "./context";
import Paths from "./components/Paths";

function App() {
  // context grab
  const { loading } = useContext(QuizmoContext);

  return (
    <div className="App">{loading ? <>Loading...</> : <Paths></Paths>}</div>
  );
}

export default App;
