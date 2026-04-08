import React from "react";
import { createContext,useState,useEffect} from "react";
// import all_product from "../Component/Assets/all.product";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props)=>{
  const [cardItem,setCardItem] = useState([]) 
  const [userid,setUserid]=useState(localStorage.getItem("userid"));

  useEffect(()=>{
  if(userid){
    axios.get(`http://localhost:4000/getcard/${userid}`)
    .then(res=>{
      setCardItem(res.data.card || []);
    });
  }
  else{
    setCardItem([]);
  }
},[userid]);

  const [all_product,setAllProduct]=useState([])
    
  useEffect(()=>{
    axios.get("http://localhost:4000/getproduct")
    .then((response)=>{
     setAllProduct(response.data);
    })

  },[]);
    

//  const addToCart=(product,size)=>{
//       if(!size){
//         alert("please select a size");
//         return;
//       }
//        setCardItem(prev => {
//      const exitingIndex =prev.findIndex(
//       item => item.id === product.id && item.size===size
//      );
//      if(exitingIndex !== -1){
//       const update = [...prev];
//       update[exitingIndex].quantity+=1;
//       return update
//      }
//      return[
//       ...prev,
//       {...product,
//         size,
//         quantity:1 }
//      ]
//  });
//  }

const addToCart = async (product,size)=>{

  if(!size){
    alert("please select size");
    return;
  }

  const userid = localStorage.getItem("userid");

  const res = await axios.post("http://localhost:4000/addtocart",{
    userid,
    productid:product.id,
    size
  });

  if(res.data.success){
    setCardItem(res.data.card); // 🔥 cart update
  }

};
  const removeCard=(index)=>{
      setCardItem((prev)=>prev.filter((_,i)=>i!==index));
  }

  const increaseQuntity =(index)=>{
    setCardItem((prev) => prev.map((item,i)=>
        i===index 
         ? {...item ,quantity:item.quantity+1}
         : item
  ))
  }

  const decreaseQuntity =(index)=>{
    setCardItem((prev) => prev.map((item,i)=>
        i===index 
         ? {...item ,quantity:item.quantity-1}
         : item
  ))
  }



  const contextValue = {all_product,cardItem,setUserid,addToCart,removeCard,increaseQuntity,decreaseQuntity};
   

   return(
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>

    )
   

}

export default ShopContextProvider;
