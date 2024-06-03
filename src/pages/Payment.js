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

  const paymentHandler = async (e) => {
    try {
      const res = await axios.post("https://ecomm-backend-z1w5.onrender.com/api/makepayment", {amount: amount * 100, currency,receipt});
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
          const validateResponse = await axios.post("https://ecomm-backend-z1w5.onrender.com/api/verifypayment", body)
          if (validateResponse.data.success) {
            const orderResponse = await axios.post("https://ecomm-backend-z1w5.onrender.com/api/create-order", {
              amount,
              address: address,
              userId: user._id,
              cartItems: cart,
              paymentId: response.razorpay_payment_id,
              paymentOrderId: response.razorpay_order_id,
              status: "order placed"
            })
            console.log(orderResponse)
            if (orderResponse.data.sucess) {
              setIsplaced(true)
              setIspending(false)
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
           <img src="data:image/png;base64,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" width={150} />
        <h4>Order Successful</h4>
        <p>Thank you so much for your order.</p>
        </div>
        <div className='d-flex justify-content-between mt-3 gap-3'><Link to="/orders"><button className='btn btn-success'>Checkout</button></Link><Link to="/"><button className='btn btn-primary'>Continue Shopping</button></Link></div>
      </div>
    </>

  )
}

export default Payment