import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Authcontext'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Orders = () => {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState()
  const navigate = useNavigate();
  const Order = ({ order }) => {
    const { cartItems, address } = order;
    const show = false;
    return (
      <div className='orders'>
        <p style={{ fontSize: "12px", color: "grey" }}>Order ID : {order._id}</p>
        {cartItems.map((cart, index) => (
          <>
            <div className='order-details-container' key={index}>
              <div><p>{cart.item_name}</p><span>Qty : {cart.qty}</span> <span>Amount : Rs.{cart.price}/-</span></div>
              <img src={cart?.images[0]} />
            </div>
            <hr className='mb-2' />
          </>

        ))}
        {show && (<><div className='address-font'>{`${address.building}, ${address.street}, ${address.city}`}</div>
          <div className='address-font'>{`${address.state}-${address.pin}`}</div>
          <div className='address-font'>+91 {user.phone}</div></>)}
      </div>
    )
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ecomm-backend-z1w5.onrender.com/api/getorder/${user._id}`)
      if(response.data.sucess === true){
        return setOrders(response.data.order)
      }
      toast.error("Couldn't find any orders")
    }
    catch (e) {
      toast.error("Oops error with server")
    }
  }  
    fetchData();

      
}, [])


return (
  <div>
    <div className='order'>
      <div className='d-flex text-center order w-100'><span className="cross-icon text-danger" onClick={() => navigate("/")}><RxCross2 /></span><h5>My Orders</h5></div>
      {orders && orders.map((order, index) => (
        <Order key={index} order={order} />
      ))}</div>
    <Toaster />
  </div>
)
}

export default Orders