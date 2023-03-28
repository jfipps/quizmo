import React from "react";
import HashLoader from "react-spinners/HashLoader";
import "../css/loading.css";

export default function Loader(props) {
  return (
    <section className="LoadingPage">
      <HashLoader color="#fff" size="100"></HashLoader>
    </section>
  );
}
