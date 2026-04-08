import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/all_products/logo.png'
import card from '../Assets/all_products/shopping-cart (1).png'
import profile from '../Assets/all_products/profile.png'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'


const Navbar = () => {
 const {cardItem =[],setUserid} =useContext(ShopContext)
 const location = useLocation();
 const navigate=useNavigate();

 const token = localStorage.getItem("token");

 const handleLogout =()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('userid')
  setUserid(null);
  navigate('/login');
 }

  return (
    <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <p>SHOPPER</p>
        </div>
        <ul className='nav-menu'>
            <li ><Link  to='/'>Shop</Link> {location.pathname === '/' && <hr />}</li>
            <li ><Link  to='/womens'>Women</Link>  {location.pathname === '/womens' && <hr />}</li>
            <li ><Link  to='/mens'>Men</Link>  {location.pathname === '/mens' && <hr />}</li>
            <li ><Link  to='/kids'>Kid</Link> {location.pathname === '/kids' && <hr />}</li>
        </ul>
        <div className="nav-login-card">
            {token ?(
              <button onClick={handleLogout}>Logout</button>
            ):(
              <>
                 <Link to='/login'><button>Login</button></Link>
                 <Link to='/signup'><button>Signup</button></Link>
              </>
            )}
            
            <Link to='/card'><img src={card} alt="card" /></Link>
              
           <div className="nav-card-count">
          {cardItem.reduce((total, item) => total + item.quantity, 0)}
        </div>
        </div>
        <div className='profile'>
          <Link to="/profile"><button><img src={profile} /></button></Link>
        </div>
    </div>

  )
}

export default Navbar
