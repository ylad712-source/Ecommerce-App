import React, { useState, useContext, useEffect } from 'react';
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = ({ product }) => {

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [size, setSize] = useState(null);
  const { addToCart } = useContext(ShopContext);

  useEffect(()=>{
    setMainImage(product.images[0]);
    setSize(null)
  },[product]);

  
  const navigate = useNavigate();
  return (
    
    <div className="product-display">
       
      {/* LEFT → IMAGE GALLERY */}
      <div className="product-left">
         <img src={mainImage} className="main-image" alt="" /> 

        <div className="thumbs">
          {product.images.slice(1).map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              className = {
              mainImage === img ? "active" : ""}
            
              alt=""
              
            />
          ))}
        </div>
      </div>

      {/* RIGHT → PRODUCT INFO */}
      <div className="product-right">

        <h1>{product.name}</h1>

        <div className="price">
          <span className="new">₹{product.new_price}</span>
          <span className="old">₹{product.old_price}</span>
        </div>

        <p className="description">
          {product.description}
        </p>

        {/* SIZE */}
        <div className="sizes">
          <h4>Select Size</h4>
          {["S","M","L","XL"].map((s) => (
            <button
              key={s}
              className={size === s ? "active" : ""}
              onClick={() => setSize(s)}
            >
               {s} 
            </button>
          ))}
        </div>

        {/* ADD TO CART */}
         <button
          className="add-to-cart"
          onClick={() => {addToCart(product, size)
          navigate("/card")}}
        >
          ADD TO CART
        </button>
         

        <p className="category">
          Category : <span>{product.category}</span>
        </p>

      </div>
    </div>
    
  );
};

export default ProductDisplay;
