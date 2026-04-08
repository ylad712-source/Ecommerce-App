import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Component/Item/Item';
const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext);
  return (
    <div className='shop-category'>
      <div className="banner">
      <img src={props.banner} alt="" />
      </div>
      <div className="men-heading-content">
        <h2>{props.category} Collection</h2>
       <hr />
      </div>
      <div className="men-image-container">
        <div className="container">
          <div className="row">
        {all_product.map((item,i)=>{
           if (props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.images[0]} new_price={item.new_price} old_price={item.old_price}/>
           }
           else{
            return null;
           }
        })}
        </div>
        </div>
      </div>
    </div>
  )
}

export default ShopCategory;
 