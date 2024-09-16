import React from "react";
import { Link } from "react-router-dom";

export default function Button() {
  return (
    <button className="btn1">
      <Link to="/form">Report a Crime</Link>
    </button>
  );
}
