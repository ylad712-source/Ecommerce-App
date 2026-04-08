import React from 'react'
import './Hero.css'
import hello_hand from '../Assets/all_products/hello.png'
import hero1 from '../Assets/all_products/hero_girl_model.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left-side">
           <h2>NEEW ARRIVALS ONLY</h2>
           <div>
           <div className="hero-hand-icon">
            <p>New</p>
              <img src={hello_hand} alt="hand" />
           </div>
           <p>collection</p>
           <p>for everyonee</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collection</div>
            {/* <img src="" alt="" /> */}
        </div>
        </div>
        
        <div className="hero-right-side">
            <img src={hero1} alt="" />
        </div>
      
    </div>
  )
}

export default Hero
