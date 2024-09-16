import React from "react";
import Image from "../images/whemi.jpeg";

import Button from "./Button";

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="box1">
        <div className="inner">
          <h1>
            "Whistleblowing is the sound of integrity in a world that too often
            falls silent".
          </h1>
          <Button />
        </div>
      </div>

      <div className="box2">
        <img src={Image} alt="whistle" className="imgg" />
      </div>
    </div>
  );
}
