import React, { useContext,useState } from 'react'
import './Navbar.css'
import logo from '../Assets/all_products/logo.png'
import card from '../Assets/all_products/shopping-cart (1).png'
import profile from '../Assets/all_products/profile.png'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

 const {cardItem =[],setUserid,all_product} =useContext(ShopContext)
 const location = useLocation();
 const navigate=useNavigate();

 const token = localStorage.getItem("token");

 const handleLogout =()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('userid')
  setUserid(null);
  navigate('/login');
 }

 const [search, setSearch] = useState("");
 const [showDropdown, setShowDropdown] = useState(false);

 const filteredProducts = all_product.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
 );

  return (
    <div className="navbar">

        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <p>SHOPPER</p>
        </div>

        <ul className='nav-menu'>
            <li><Link to='/'>Shop</Link> {location.pathname === '/' && <hr />}</li>
            <li><Link to='/womens'>Women</Link> {location.pathname === '/womens' && <hr />}</li>
            <li><Link to='/mens'>Men</Link> {location.pathname === '/mens' && <hr />}</li>
            <li><Link to='/kids'>Kid</Link> {location.pathname === '/kids' && <hr />}</li>
        </ul>

        {/* SEARCH */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onFocus={() => setShowDropdown(true)}
          />

          {showDropdown && search && ( 
            <div className="search-dropdown">
              {filteredProducts.length === 0 ? (
                <p>No products found</p>
              ) : (
                filteredProducts.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="search-item"
                    onMouseDown={() => navigate(`/product/${item.id}`)}
                  >
                    <img src={item.images[0]} alt="" />
                    <span>{item.name}</span>
                  </div>
                ))
              )}
            </div>
          )} 
        </div>

        {/* LOGIN + CART */}
        <div className="nav-login-card">

            {token ?(
              <button onClick={handleLogout}>Logout</button>
            ):(
              <>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signup'><button>Signup</button></Link>
              </>
            )}

            {/* 🔥 CART WITH BADGE */}
            <div className="cart-wrapper">
              <Link to='/card'>
                <img src={card} alt="cart" />
              </Link>

              <div className="nav-card-count">
                {cardItem.reduce((total, item) => total + item.quantity, 0)}
              </div>
            </div>

        </div>

        {/* PROFILE */}
        <div className='profile'>
          <Link to="/profile">
            <button><img src={profile} alt="" /></button>
          </Link>
        </div>

    </div>
  )
}

export default Navbar