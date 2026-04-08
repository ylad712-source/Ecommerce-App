require("dotenv").config();
const connectToMongo = require('./db');
const path = require('path');
const mongoose = require('mongoose'); 
const screet_key=process.env.JWT_SECRET;
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
connectToMongo();


const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const multer = require('multer');


const app = express();

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{ 
    res.send("express app is running");
});

//image storage engine
//store file on disk
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload", upload.array('product',4), (req,res)=>{

    const image_urls = req.files.map((file)=>{
        return `http://localhost:${port}/images/${file.filename}`
    })

    res.json({
        success:1,
        image_urls:image_urls
    })
})

//creating schema for product
const Product = mongoose.model("Product",{
  id:{
    type:Number,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  images:{
    type:[String],
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
   new_price:{
     type:Number,
     require:true,
  },
  old_price:{
    type:Number,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  available:{
    type:Boolean,
    default:true,
  },
})


const authmiddleware = (req,res,next)=>{
 try {
  const token=req.header("auth-token");
  if (!token){
    return res.status(401).json({
      success:false,
      message:"access denied.No token provided "
    })
  }
  const decode = jwt.verify(token,screet_key);
  req.user = decode;
  next();
 } catch (error) {
    res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
 }

}




app.post("/addproduct",async(req,res)=>{
  let products = await Product.find({});
  let id;
  if(products.length > 0 ){
    let last_product_in_array = products.slice(-1);
    let last_product=last_product_in_array[0]
    id = last_product.id+1;
  }
  else{
    id=1;
  }
    const product = new Product({
    id:id,
    name:req.body.name,
    images:req.body.images,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
    });
    await product.save();
    res.json({
        success:true,
        name:req.body.name,
    })
})



//delete the product
app.delete("/removeproduct/:id", async (req, res) => {
  await Product.findOneAndDelete({ id: req.params.id });

  res.json({ success: true });
});
//get all the product
app.get("/getproduct",async(req,res)=>{
 const produts= await Product.find({})
  res.json(produts)
})

const User = mongoose.model("User",{
  name:{
    type:String,
     required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  card:[{
    productid:Number,
    quantity:Number,
    size:String
  }]
})

app.post("/signup",async(req,res)=>{
  try{
  const {name,email,password}=req.body;

     let check = await User.findOne({email});
     if(check){
      return res.status(400).json({success:false,error:"user already use this email id so create unique email id"})
    }
   
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({
      name,
      email,
      password:hashPassword,
      card:[]
    })
    //generate token
    const token = jwt.sign(
      {id:user._id},screet_key,{ expiresIn: "7d" }
    );

    res.json({
      success:true,
      token,
      user:{
        id:user.id,
        name:user.name,
        email:user.email
      }
    })

  }catch (error){
    res.status(500).json({success:false,error:error})
  }
})

app.post("/login",async(req,res)=>{
   try {
    const {email,password}=req.body
    console.log("Login request:", email, password)
    let user= await User.findOne({email})
    if(!user){
       return res.json({
        success:false,
        message:"Invallid email"
      })
    }
  
    //campre password
    const ismatch = await bcrypt.compare(password,user.password)
    if(!ismatch){
      return res.status(500).json({
        success:false,
        message:"invalid password"
      })
    }

    //generate token 
    const token = jwt.sign(
      {id:user._id},screet_key,{expiresIn:"7d"
      }
    )
    res.json({
      success:true,
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    })
    
   }catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
  
 })
 app.get("/getcard/:userid",async(req,res)=>{
  try {
    const user = await User.findById(req.params.userid)
    res.json({
      success:true,
      card:user.card || []
    })
  } catch (error) {
      res.json({  
      success:false,
      message:"Error fetching cart"
    })
  }
 })

app.post("/addtocart", async (req,res)=>{
  try {

    const {userid, productid, size} = req.body;

    const user = await User.findById(userid);

    const existing = user.card.find(
      item => item.productid === productid && item.size === size
    );

    if(existing){
      existing.quantity += 1;
    } else {
      user.card.push({
        productid,
        quantity:1,
        size
      });
    }

    await user.save();

    res.json({
      success:true,
      card:user.card
    });

  } catch (error) {
    res.json({
      success:false
    });
  }
});


app.get("/profile",async(req,res)=>{
  try {
    const userid =  req.headers.userid;
    const user =await User.findById(userid).select("-password");
    res.json({
      success:true,
      user
    });
  } catch (error) {
    res.json({
      success:false,
      message:"error fetching profile"
    });
  }
});

app.listen(port,()=>{
    console.log("server is running " + port);
});
