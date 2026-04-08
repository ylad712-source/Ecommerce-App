import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import './CSS/Card.css'


const Card = () => {

  

  const { cardItem,all_product,removeCard , increaseQuntity,decreaseQuntity} = useContext(ShopContext);
  
  const totalPrice = cardItem.reduce((sum,item)=>{
  const product = all_product.find(p => p.id === item.productid);
  return product ? sum + item.quantity * product.new_price : sum;
},0)
  return (
    <div className="card-container"> 
      <h2>Your Cart</h2>
      <div className="card-item-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total Price</p>
        <p>Remove Card</p>
      </div>
      {cardItem.length === 0 && <p>Your Cart is Empty </p>}
       
      
      {/* {cardItem.map((item, i) =>{ 
       const product = all_product.find(
          p => p.id === item.productid
        );

          if(!product) return null;

           const itemTotalPrice = item.quantity * item.new_price;
        return(
        
        <div className="card-item-format card-item-format-main" key={i} >
          <img
            src={item.images[0]}
            alt="card-img"
          />
         
            <p>{item.name}</p>
            <p>Size: {item.size}</p>
            <p>₹{item.new_price}</p>
            <div> 
              <button onClick={()=>decreaseQuntity(i)} disabled={item.quantity<=1}>-</button>
             <span>{item.quantity}</span>
            <button onClick={()=>increaseQuntity(i )}>+</button>
            </div> 
             <p>Total Price :{itemTotalPrice}</p>
          
          <button className="remove-card-button" onClick={()=>removeCard(i)}>X</button>
        </div>
        
      )})} */}
      
      {cardItem.map((item, i) =>{ 

  const product = all_product.find(
    p => p.id === item.productid
  );

  if(!product) return null;

  const itemTotalPrice = item.quantity * product.new_price;

  return(

    <div className="card-item-format card-item-format-main" key={i} >

      <img
        src={product.images[0]}
        alt="card-img"
      />

      <p>{product.name}</p>
      <p>Size: {item.size}</p>
      <p>₹{product.new_price}</p>

      <div> 
        <button onClick={()=>decreaseQuntity(i)} disabled={item.quantity<=1}>-</button>
        <span>{item.quantity}</span>
        <button onClick={()=>increaseQuntity(i)}>+</button>
      </div> 

      <p>Total Price : {itemTotalPrice}</p>

      <button className="remove-card-button" onClick={()=>removeCard(i)}>X</button>

    </div>
  )
})}

     <div className="total-price">
      <p>{totalPrice}</p>
     </div>
    </div>
  );
};

export default Card;
