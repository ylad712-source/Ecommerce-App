import React, { useContext,useState } from 'react'
import './RelatedProduct.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'

const RelatedProduct = ({ product }) => {
     const { all_product } = useContext(ShopContext);
 

    const [page, setPage] = useState(0);
  const LIMIT = 4;  

  if (!product) return null; 

  const relatedProduct=all_product.filter(
    item=>
      item.category===product.category &&
    item.id!==product.id
  )

  const visibleProduct=relatedProduct.slice(
    page * LIMIT,
    page * LIMIT + LIMIT
    );

  const  handleNext=()=>{
    if((page + 1)* LIMIT <relatedProduct.length){
      setPage(page+1)
    }
  }

   const  handlePrev =()=>{
    if(page>0){
      setPage(page-1)
    }
   }


  return (
     <div className='related-product'>
      <h1>Related Product</h1>
      <hr />
      <div className="container">
        <div className="row">
        {visibleProduct.map(item => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.images[0]}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
          </div>
          <div className="buttons">
          <button onClick={handlePrev} disabled={page === 0}>
             Prev 
          </button>

          <button
            onClick={handleNext}
            disabled={(page + 1) * LIMIT >= relatedProduct.length}
          >
            Next
          </button>
          </div>
          </div>
      </div>
    
  )
}

export default RelatedProduct
