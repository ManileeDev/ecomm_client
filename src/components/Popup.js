import React, { useContext } from 'react'
import { RxCross1 } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../context/Authcontext';
import toast, { Toaster } from "react-hot-toast";


const Popup = ({ product, isShow, setIsShow, show, setShow, value, valueHandler, cartdata, toastVal, varientHandler, varient }) => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    // const {dispatch} = useContext(CartContext)
    const datas = { userId: user?._id, prodId: product?._id, item_name: product?.name, price: product?.price, images: product?.images, ...cartdata }
    const cartHandler = () => {
        //  dispatch({ type: 'ADDTOCART', payload: datas})
        //  localStorage.setItem("cart", JSON.stringify(datas))
        if (user) {
            axios.post("https://ecomm-backend-z1w5.onrender.com/api/addtocart", datas)
                .then(result => {
                    if (result.data.success == true) {

                        toastVal(result.data.success)
                    }
                })
                .catch((e) => console.log(e.message));
        }
        else {
            toast.error("Please Login")
            setTimeout(() => { navigate("/login") }, 1500)
        }

    }

    // console.log(datas)
    return (
        <div><div className={`show-popup w-100 ${isShow ? "" : "d-none"}`}>
            <div className="p-3 pb-0 w-100"><div className="d-flex justify-content-between"><div>Add to Cart</div><span onClick={() => setIsShow(false)}><RxCross1 /></span></div><hr className="mb-0" />
            </div>
            <div className="p-3 pb-0 w-100">
                {(product?.category == "Clothings") && <div className="show-size">
                    <h5>Select Size</h5>
                    <div className="select-size">
                        <span className={`sizes ${value.m && 'sizes-active'}`} onClick={() => valueHandler('m')}>M</span>
                        <span className={`sizes ${value.l && 'sizes-active'}`} onClick={() => valueHandler('l')}>L</span>
                        <span className={`sizes ${value.xl && 'sizes-active'}`} onClick={() => valueHandler('xl')}>XL</span>
                        <span className={`sizes ${value.xxl && 'sizes-active'}`} onClick={() => valueHandler('xxl')}>XXL</span>
                    </div>
                </div>}
                {/* {(product?.category === "Mobiles" || product?.category === "Laptops") && <div className="show-var">
                    <h5>Select varient</h5>
                    <div className="select-var">
                        <span className={`var ${varient[128] && 'var-active'}`} onClick={() => varientHandler('128')}>128GB</span>
                        <span className={`var ${varient[256] && 'var-active'}`} onClick={() => varientHandler('256')}>256GB</span>
                        <span className={`var ${varient[512] && 'var-active'}`} onClick={() => varientHandler('512')}>512GB</span>
                        <span className={`var ${varient["1TB"] && 'var-active'}`} onClick={() => varientHandler('1TB')}>1TB</span>
                    </div>
                </div>} */}
                {(product?.category == "Footwears") && <div className="show-size">
                    <h5>Select Size</h5>
                    <div className="select-size">
                        <span className={`sizes text-center ${value.m && 'sizes-active'}`} onClick={() => valueHandler('m')}>7</span>
                        <span className={`sizes text-center${value.l && 'sizes-active'}`} onClick={() => valueHandler('l')}>8</span>
                        <span className={`sizes text-center${value.xl && 'sizes-active'}`} onClick={() => valueHandler('xl')}>9</span>
                        <span className={`sizes text-center${value.xxl && 'sizes-active'}`} onClick={() => valueHandler('xxl')}>10</span>
                    </div>
                </div>}<hr /></div>
            <div className="p-3 pb-0 w-100">
                <div className="d-flex justify-content-between">Total Price: <span>{product?.price}</span></div><hr />
            </div>
            <div className="p-3 w-100 text-center"><button className="btn btn-md btn-buy" onClick={cartHandler}>
                <FaShoppingCart />
                Add to Cart
            </button></div>
        </div>
            <div className={`show-popup w-100 ${show ? "" : "d-none"}`}>
                <div className="p-3 pb-0 w-100"><div className="d-flex justify-content-between pb-0"><div>Add to Cart</div><span onClick={() => setShow(false)}><RxCross1 /></span></div><hr className="mb-0" />
                </div>
                <div className="p-3 pb-0 w-100">
                    <h5>Select Size</h5>
                    <div className="show-size">
                        <div className="select-size text-center">
                            <span className={`sizes ${value.m && 'sizes-active'}`} onClick={() => valueHandler('m')}>M</span>
                            <span className={`sizes ${value.l && 'sizes-active'}`} onClick={() => valueHandler('l')}>L</span>
                            <span className={`sizes ${value.xl && 'sizes-active'}`} onClick={() => valueHandler('xl')}>XL</span>
                            <span className={`sizes ${value.xxl && 'sizes-active'}`} onClick={() => valueHandler('xxl')}>XXL</span>
                        </div>
                    </div><hr /></div>
                <div className="p-3 pb-0 w-100"><div className="d-flex justify-content-between">Total Price: <span>{product?.price}</span></div><hr /></div>
                <div className="p-3 w-100 text-center"><button className="btn btn-md btn-buy" onClick={cartHandler}>
                    <TbPlayerTrackNextFilled />
                    Buy Now
                </button></div>
                <Toaster />
            </div>
            <div className={`popup-container ${isShow || show ? "" : "d-none"}`}></div></div>

    )
}

export default Popup