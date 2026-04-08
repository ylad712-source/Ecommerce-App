import React from 'react'
import './NewCollection.css'
import new_collection from '../Assets/new_collection'
import Item from '../Item/Item'

const NewCollection = () => {
  return (
    <div className='new-collection'>
        <div className="new-collection-heading">
           <h2>NEW COLLECTION</h2>
          <hr />
        </div>
      <div className="container">
        <div className="row">
            {new_collection.map((item,i)=>{
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
      </div>
    </div>
  )
}

export default NewCollection
