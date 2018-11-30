import "./spinner.css";
import React from "react";

const Spinner = () => (
  <div
    role="alert"
    aria-live="assertive"
    className="la-ball-scale-multiple la-dark la-2x"
  >
    <div />
    <div />
    <div />
    <p className="spinner-copy">Loading...</p>
  </div>
);

export default Spinner;
