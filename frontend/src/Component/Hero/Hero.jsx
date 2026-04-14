import React from "react";
import "./Hero.css";
import heroImg from "../Assets/all_products/hero_girl_model.png";

const Hero = () => {
  return (
    <div className="hero">
      
      <div className="hero-left">
        <p className="small-text">NEW ARRIVALS ONLY</p>

        <h1>
          New <span className="emoji">👋</span>
        </h1>
        <h1>collection</h1>
        <h1>for everyone</h1>

        <button className="hero-btn">Latest Collection ⬇</button>
      </div>

      <div className="hero-right">
        <img src={heroImg} alt="hero" />
      </div>

    </div>
  );
};

export default Hero;