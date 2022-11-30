import React, { useEffect, useState } from "react";

const QuizmoContext = React.createContext();

const QuizmoProvider = ({ children }) => {
  const [test, setTest] = useState("This is a test");
  return (
    <QuizmoContext.Provider value={{ test, setTest }}>
      {children}
    </QuizmoContext.Provider>
  );
};

export { QuizmoContext, QuizmoProvider };
