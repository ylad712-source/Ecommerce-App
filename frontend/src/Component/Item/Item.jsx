import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='col-md-3'>
      <div className='item'>
        <div className="card" >
          <Link to={`/product/${props.id}`}  ><img src={props.image} className="card-img-top" alt="..." /></Link>
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
           <div className="price">
            <p className="card-text">${props.new_price}</p>
            <p className="card-text2">${props.old_price}</p>
           </div>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
         </div>
        </div>
      </div>
    </div>
  )
}

export default Item
