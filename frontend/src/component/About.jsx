import React from "react";
import Logo1 from "../images/logo1.png"
import Logo2 from "../images/logo2.png"

export default function About() {
  return (
    <div className="about">

      <div className="abt-inner">
        <h3>
        WhistleChain is a secure, anonymous platform designed to empower whistleblowers. 
        Using advanced blockchain technology, we ensure that your reports are encrypted, immutable, 
        and accessible only to those authorized. Our mission is to provide
         a safe channel for exposing misconduct without fear, protecting your identity at every step. 
         Join us in making the world a more transparent and just place.
        </h3>
      </div>

      <div className="imgs">
        <img src={Logo1} alt="logo" className="imagi1" />
        <img src={Logo2} alt="logo" className="imagi2"/>
      </div>
    </div>
  );
}
