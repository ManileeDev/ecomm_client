import React, { useContext, useEffect} from 'react'
import { AuthContext } from '../context/Authcontext';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../context/CartContext';


export default function Cart() {

  const { user } = useContext(AuthContext)
  const {cart,dispatch} = useContext(CartContext)
  const userId = user._id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://ecomm-backend-z1w5.onrender.com/api/getcart/${userId}`);
        const json = await response.json();
        if (response.ok) {
          return dispatch({type:"UPDATE_CART",payload:json})
        }
        console.log()
      }
      catch (e) {
        console.log(e.message)
      }
    }

    fetchData();
    // axios
    //   .get("https://ecomm-backend-z1w5.onrender.com/api/getcart/" + userId)
    //   .then((result) => {
    //     if (result.data.success) {
    //       setCart(result.data.cartItems)
    //     }
    //   })
    //   .catch((err) => console.log(err.message));

  }, [dispatch,userId]);




  const updateCartData = (id)=>{
    axios.post("https://ecomm-backend-z1w5.onrender.com/api/removecart", { id })
    .then(() => {
      toast.success("Item Removed");
      const cartItems = cart.filter((cartval) => cartval._id !== id);
      dispatch({type:"UPDATE_CART", payload:cartItems})
    })
    .catch(err => console.log(err.message))    
  }

   
  const total = Math.floor(cart.reduce((acc, item) => acc + (item.price * item.qty), 0));
  return (
    <>
      <div className='d-flex gap-4 py-2 px-4 head-nav'><Link to="/" className='text-white'><IoIosArrowBack /></Link>CART</div><hr />
      <div className='cart-nav'>
        <div className='nav-pages'><div className='nav-pages-num'>1</div><div>Cart</div></div>
        <div className='nav-pages'><div className='nav-pages-num'>2</div><div>Address</div></div>
        <div className='nav-pages'><div className='nav-pages-num'>3</div><div>Payment</div></div>
      </div>
      <hr />
      <div className='cart-details'>
        {cart && cart.map((product) => (
          <div key={product._id} className="cart-details-container" >
            <img src={product.images[0]} alt={product.item_name} />
            <div className='cart-items'><h6 className="">{product.item_name}</h6>
              <span className="">₹{product.price}/-</span>
              <div className='d-flex gap-3'><span className="">Size : {product.size}</span>
                <span className="">Qty : {product.qty}</span>
              </div>
              <span style={{ fontWeight: "bold" }} onClick={() => updateCartData(product._id)}><RxCross1 className='text-danger' /> Remove</span>
            </div>
          </div>
        ))}
         {cart.length === 0 && <div className='text-center'><img src='https://shop.millenniumbooksource.com/static/images/cart1.png'alt="" width={"350px"}/></div>}
      </div>
      <Toaster />
        <div className='cart-footer'>
          <div className='d-flex flex-column w-50'>
          <h5>{total}</h5>
          <h6 className='text-danger'>Total Cart</h6>
          </div>
          <Link to='/address'><button className='btn btn-md btn-buy'>continue</button></Link>
        </div>
    </>

  )
}
