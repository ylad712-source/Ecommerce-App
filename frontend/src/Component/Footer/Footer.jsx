import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
       <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li>All Products</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Offers</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Women</h3>
          <ul>
            <li>Dresses</li>
            <li>Tops</li>
            <li>Footwear</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Men</h3>
          <ul>
            <li>T-Shirts</li>
            <li>Shirts</li>
            <li>Watches</li>
            <li>Shoes</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Kids</h3>
          <ul>
            <li>Clothing</li>
            <li>Toys</li>
            <li>School Bags</li>
            <li>Footwear</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 YourShop. All Rights Reserved.</p>
      </div>
    </footer>

  )
}

export default Footer
