import React from 'react'
import './Offer.css'
import hero2 from '../Assets/all_products/hero_girl_model.png'

const Offer = () => {
  return (
    <div className='offer'>
      <div className="offer-left">
         <div className='text1'>
            <h1>Exclusive</h1>
            <h1>Offer For You</h1>
         </div>
         <div className='text2'>
            <p>ONLY ON BEST SELLERS PRODUCT</p>
         </div>
         <button>Click Now</button>
      </div>
      <div className="offer-right">
         <img src={hero2} alt="model" />
      </div>
    </div>
  )
}

export default Offer
