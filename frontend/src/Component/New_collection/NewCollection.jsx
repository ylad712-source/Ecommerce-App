
import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import './NewCollection.css'

const NewCollection = () => {

  const [products,setProducts] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/getproduct")
    .then(res=>res.json())
    .then(data=>{
      const filtered = data.filter(item=>item.type === "new").slice(0,8);
      setProducts(filtered);
    })
  },[])

  return (
    <div className="new-collection">
  <div className="heading">
    <h2>NEW COLLECTION</h2>
    <hr />
  </div>

  <div className="container">
    <div className="row">
      {products.map((item,i)=>(
          <Item key={i} id={item.id} name={item.name} image={item.images[0]} new_price={item.new_price} old_price={item.old_price} />
        ))}
  
    </div>
  </div>
</div>
  )
}
export default NewCollection