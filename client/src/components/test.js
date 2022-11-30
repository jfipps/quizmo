import React, { useState, useEffect } from "react";

export default function Test() {
  const [serverRes, setServerRes] = useState("");

  const APICall = async () => {
    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      setServerRes(data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    APICall();
  }, []);

  return (
    <div>
      <h1>{serverRes}</h1>
    </div>
  );
}
