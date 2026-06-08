import React from 'react'
import './ProceedToPayment.css'
import {useState} from 'react'
import axios from 'axios'


const ProceedToPayment = () => {
 
    const [paymentData,setPaymentData] = useState({
        fullname:'',
        email:'',
        phone:'',
        addresses:'',
        city: '',
        pincode: '',
        cardNumber: '',
        expiry: '',
        cvv: ''   
    })
 

    const handleChnage =(e)=>{
        setPaymentData({
            ...paymentData,
            [e.target.name]:e.target.value
        })
    }

     
    const handleSubmit =async (e)=>{
        e.preventDefault()
       
        try {
            const userid= localStorage.getItem("userid");

            const response = await axios.post( "http://localhost:4000/placeorder",
                {
                    userid,
                    fullname:paymentData.fullname,
                    email:paymentData.email,
                    phone:paymentData.phone,
                    address:paymentData.addresses,
                    city:paymentData.city,
                    pincode:paymentData.pincode,
                    totalAmount:5000
                }
                )
             if(response.data.success){
              alert("Order Placed Successfully")
         }
        } catch(error){
             console.log(error)
        }
            
        
    }

  return (
    <div className='payment-container'>

      <form className='payment-form' onSubmit={handleSubmit}>

        {/* LEFT SIDE */}
        <div className='User-details'>

          <h2>Checkout Payment</h2>

          <input
            type='text'
            name='fullname'
            placeholder='Full Name'
            value={paymentData.fullname}
            onChange={handleChnage}
            required
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={paymentData.email}
            onChange={handleChnage}
            required
          />

          <input
            type='text'
            name='phone'
            placeholder='Phone Number'
            value={paymentData.phone}
            onChange={handleChnage}
            required
          />

          <textarea
            name='addresses'
            placeholder='Addresses'
            value={paymentData.addresses}
            onChange={handleChnage}
            required
          />

          <div className='row'>

            <input
              type='text'
              name='city'
              placeholder='City'
              value={paymentData.city}
              onChange={handleChnage}
              required
            />

            <input
              type='text'
              name='pincode'
              placeholder='Pincode'
              value={paymentData.pincode}
              onChange={handleChnage}
              required
            />

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className='Card-details'>

          <h3>Card Details</h3>

          <input
            type='text'
            name='cardNumber'
            placeholder='Card Number'
            value={paymentData.cardNumber}
            onChange={handleChnage}
            required
          />

          <div className='row'>

            <input
              type='text'
              name='expiry'
              placeholder='MM/YY'
              value={paymentData.expiry}
              onChange={handleChnage}
              required
            />

            <input
              type='password'
              name='cvv'
              placeholder='CVV'
              value={paymentData.cvv}
              onChange={handleChnage}
              required
            />

          </div>

          <button type='submit'>
            Pay Now
          </button>

        </div>

      </form>

    </div>
  )
}

export default ProceedToPayment