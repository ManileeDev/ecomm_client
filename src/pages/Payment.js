import React, { useContext, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/Authcontext';

const Payment = () => {
  const { cart,dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [ispending, setIspending] = useState(true);
  const [isplaced, setIsplaced] = useState(false);
  const address = user.address;
  const amount = Math.floor(cart.reduce((acc, item) => acc + (item.price * item.qty), 0));
  const currency = "INR"
  const receipt = "testing321"
  
  const updateCartData = (id)=>{
    axios.post("https://server-seven-red.vercel.app/api/removecart", { id })
    .then(() => {
      console.log("Item Removed");
      dispatch({ type: "CLEAR_CART"});
    })
    .catch(err => console.log(err.message))    
  }

  const paymentHandler = async (e) => {
    try {
      const res = await axios.post("https://server-seven-red.vercel.app/api/makepayment", {amount: amount * 100, currency,receipt});
      var options = {
        "key": process.env.rzp_key, // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        "name": "Leecart", //your business name
        "description": "Test Transaction",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST-7EFWQErhqFDQVYfDw4BzKnG8K56ij0eqNbkL3Ji3wp-C6blKMeK4tN4XXoV61IxMfg&usqp=CAU",
        "order_id": res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response) {
          console.log(response)
          const body = {
            ...response
          }
          const validateResponse = await axios.post("https://server-seven-red.vercel.app/api/verifypayment", body)
          if (validateResponse.data.success) {
            const orderResponse = await axios.post("https://server-seven-red.vercel.app/api/create-order", {
              amount,
              address: address,
              userId: user._id,
              cartItems: cart,
              paymentId: response.razorpay_payment_id,
              paymentOrderId: response.razorpay_order_id,
              status: "order placed"
            })
            console.log("order response", orderResponse);
            if (orderResponse.data.sucess) {
              setIsplaced(true)
              setIspending(false)
              updateCartData(cart._id)
              return toast.success("Order Placed")
            }
          }
          return toast.error("Order Failed")

        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": `${user.fullname}`, //your customer's name
          "email": `${user.email}`,
          "contact": `${user.phone}` //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#33398a"
        }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        toast.error("Payment failed")
      });
      rzp1.open();
      e.preventDefault();
    }
    catch (err) {
      console.log(err);
    }




  }

  return (
    <>
      <div className={ispending ? "" : "hide"}>
        <div className='d-flex gap-4 py-2 px-4 head-nav'><Link to="/address" className='text-white'><IoIosArrowBack /></Link>PAYMENT</div><hr />
        <div className='cart-nav'>
          <div className='nav-pages'><div className='nav-pages-num'>1</div><div>Cart</div></div>
          <div className='nav-pages'><div className='nav-pages-num'>2</div><div>Address</div></div>
          <div className='nav-pages'><div className='nav-pages-num'>3</div><div>Payment</div></div>
        </div>
        <hr />
        <Toaster />
        <div className='p-2'>
          <h5 style={{ fontWeight: "bold" }} className='text-success'>Deliver to :</h5>
          <div>
            <p style={{ fontWeight: "bold", color: "rgb(51, 57, 138)" }}>{user.fullname}</p>
            <div className='address-font'>{`${address.building}, ${address.street}, ${address.city}`}</div>
            <div className='address-font'>{`${address.state}-${address.pin}`}</div>
            <div className='address-font'>+91 {user.phone}</div>
          </div>
        </div>
        <hr />
        <div className='cart-details'>
          {cart && cart.map((product) => (
            <div key={product._id} className="cart-details-container" >
              <div className='cart-items'><h6 className="">{product.item_name}</h6>
                <span className="">₹{product.price}/-</span>
                <div className='d-flex gap-3'><span className="">Size : {product.size}</span>
                  <span className="">Qty : {product.qty}</span>
                </div>
              </div>
              <img src={product.images[0]} alt={product.item_name} />
            </div>
          ))} </div>
        <div className='cart-footer'>
          <div className='d-flex flex-column w-50'>
            <span>Rs.{amount}/-</span>
            <span className='text-danger'>Total Amount</span>
          </div>
          <button className='btn btn-md btn-buy' style={{ fontSize: "0.9rem" }} onClick={paymentHandler}>Proceed Payment</button>
        </div>
      </div>
      <div  className={isplaced ? "order-placed-container" : "hide"}>
        <div className='order-placed'>
           <img src="../../assets/done.png" width={150} />
        <h4>Order Successful</h4>
        <p>Thank you so much for your order.</p>
        </div>
        <div className='d-flex justify-content-between mt-3 gap-3'><Link to="/orders"><button className='btn btn-success'>Checkout</button></Link><Link to="/"><button className='btn btn-primary'>Continue Shopping</button></Link></div>
      </div>
    </>

  )
}

export default Payment