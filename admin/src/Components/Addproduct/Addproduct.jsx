import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/area_upload.png'


const Addproduct = () => {

  const [images,setImages]=useState([]);
  const [productDetails , setProductDetails] = useState({
    name:"",
    images:[],
    category:"womens",
    new_price:"",
    old_price:"",
    description:""
  })

  const imageHandler=(e)=>{
    const files=Array.from(e.target.files);
    setImages(files)

    // setProductDetails({...productDetails,images:files})
  }

  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

   const addproduct =async()=>{
    try {
      const formData = new FormData();  
      images.forEach((img)=>{
        formData.append("product",img)
      })
      
      
      const uploadpoint = await fetch("http://localhost:4000/upload",{
        method:'POST',
        body:formData,
      });
      const  uploadData = await uploadpoint.json();
      const img_urls=uploadData.image_urls

      const product ={
        ...productDetails,
        images:img_urls
      }
      await fetch("http://localhost:4000/addproduct",{
        method:"POST",
        headers:{
        "Content-Type": "application/json",
        },
        body:JSON.stringify(product)
      })
     console.log("product added successfuly")
      
    } catch (error) {
      console.log(error)
    }
   }

  return (
    <div className='add-prodcut'>
      <div className='addproduct-itemfield'>
        <p>Product Title</p>
        <input value={productDetails.name}onChange={changeHandler} type="text" name="name" placeholder='Type Here' />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input value={productDetails.old_price}onChange={changeHandler} type="text" name="old_price" placeholder='Type Here' />
        </div>
         <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input value={productDetails.new_price}onChange={changeHandler} type="text" name="new_price" placeholder='Type Here' />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>About Product</p>
        <input value={productDetails.description}onChange={changeHandler} type="text" name="description" placeholder='Type Here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select value={productDetails.category}onChange={changeHandler} name="category" className='addproduct-selector'>
          <option value="womens">Women</option>
          <option value="mens">Men</option>
          <option value="kids">Kid</option>
        </select>
      </div>

<div className="addproduct-itemfield">

  <label htmlFor="file-input">
  <img src={upload_area} className="addproduct-thumbnail-img" alt="" />
  </label>

  <input onChange={imageHandler} type="file" multiple id="file-input" hidden />

    <div className="preview-images">
      {images.map((img,index)=>(
        <img
        key={index}
        src={URL.createObjectURL(img)}
        className="addproduct-thumbnail-img"
        />
      ))}
   </div>
</div>
     
      <button onClick={()=>{addproduct()}} className='addproduct-btn'>Add Product</button>
    </div>
  )
}

export default Addproduct
