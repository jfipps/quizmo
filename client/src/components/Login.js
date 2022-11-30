import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../context";

export default function Login(props) {
  const { test } = useContext(QuizmoContext);
  console.log(test);
  return <div>{test}</div>;
}
