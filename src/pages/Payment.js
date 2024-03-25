import React, { useContext, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/Authcontext';

const Payment = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const address = user.address;
  const amount = Math.floor(cart.reduce((acc, item) => acc + (item.price * item.qty), 0));
  const receiptId = "Rcpt_1234"
  const currency = "INR"

  const paymentHandler = async (e) => {
    try {
      const res = await axios.post("http://localhost:4500/api/makepayment", { amount: amount * 100, currency, receipt: receiptId });

      // console.log(res.data.id);
      var options = {
        "key": "rzp_test_2HNfnXPlfnqiUv", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        "name": "Leecart", //your business name
        "description": "Test Transaction",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST-7EFWQErhqFDQVYfDw4BzKnG8K56ij0eqNbkL3Ji3wp-C6blKMeK4tN4XXoV61IxMfg&usqp=CAU",
        "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response) {
          const body = {
            ...response
          }
          const validateResponse = await axios.post("http://localhost:4500/api/verifypayment", body)
          if (validateResponse.data.success) {
            console.log(validateResponse);
            return toast.success("Payment Successful");
          }
          toast.error("Payment Failed");

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
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
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
      <div className='d-flex gap-4 py-2 px-4 head-nav'><Link to="/address" className='text-white'><IoIosArrowBack /></Link>PAYMENT</div><hr />
      <div className='cart-nav'>
        <div className='nav-pages'><Link id="Link" to='/cart'><div className='nav-pages-num'>1</div><div>Cart</div></Link></div>
        <div className='nav-pages'><div className='nav-pages-num'><Link id="Link" to='/address'>2</Link></div><div>Address</div></div>
        <div className='nav-pages'><div className='nav-pages-num'><Link id="Link" to='/payment'>3</Link></div><div>Payment</div></div>
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
      </div>    </>
  )
}

export default Payment