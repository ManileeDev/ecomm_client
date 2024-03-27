import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import Popup from "../components/Popup";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const ShowDetails = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [toastVal, setToastVal] = useState()
    const [show, setShow] = useState(false);
    const [cartdata, setCartdata] = useState({
        qty: 1,
        size: '',
        varient: ''
    })
    const [size, setSize] = useState({
        m: false,
        l: false,
        xl: false,
        xxl: false
    })

    const [varient, setVarient] = useState({
        "128": false,
        "256": false,
        "512":false,
        "1TB":false
    })
    const valueHandler = (size) => {
        setSize({
            m: false,
            l: false,
            xl: false,
            xxl: false,
            [size]: true
        })
        setCartdata({
            ...cartdata,
            size: size,
            varient: varient
        })
        }
        
        
        const varientHandler = (varient) => {
            setVarient(
                {
                    "128": false,
                    "256": false,
                    "512":false,
                    "1TB":false,
                    [varient]: true
                })
                setCartdata({
                    ...cartdata,
                    size: size,
                    varient: varient
                })}

        useEffect(() => {
            const showProduct = () => {
                axios
                    .get("http://localhost:4500/api/product/" + id)
                    .then((result) => setProduct(result.data.product))
                    .catch((err) => err.message);
            };
            showProduct();
        }, []);

        // const sliderImages = [product?.images]

        // console.log(sliderImages)



        useEffect(() => {
            setIsShow(false)
            if (toastVal) {
                toast.success("Item added")
            }
        }, [toastVal])

        return (
            <>  
                <Navbar />
                <div className="details-container">
                    <div className="d-flex flex-column justify-content-space-between align-items-center gap-2 w-75">
                        <div className="show-image">
                            <img src={product?.images[0]} alt={product?.name} />
                        </div>
                        <div className="show-title-content">
                            <div className="show-title">{product?.name}</div>
                            <div className="show-icon">
                                <div className="d-flex flex-column align-items-center">
                                    <IoMdHeartEmpty />
                                    <span>Wishlist</span>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <IoShareSocialOutline />
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                        <div className="show-price"><h2 className="text-start fs-bold">
                            ₹{product?.price}
                            <span className="text-success m-2" style={{ fontSize: "0.7rem" }}>
                                  10 % Special offer <MdOutlineKeyboardArrowRight />
                            </span>
                        </h2></div>
                        {(product?.category == "Clothings") && <div className="show-size">
                            <h5>Select Size</h5>
                            <div className="select-size">
                                <span className={`sizes ${size.m && 'sizes-active'}`} onClick={() => valueHandler('m')}>M</span>
                                <span className={`sizes ${size.l && 'sizes-active'}`} onClick={() => valueHandler('l')}>L</span>
                                <span className={`sizes ${size.xl && 'sizes-active'}`} onClick={() => valueHandler('xl')}>XL</span>
                                <span className={`sizes ${size.xxl && 'sizes-active'}`} onClick={() => valueHandler('xxl')}>XXL</span>
                            </div>
                        </div>}
                        {(product?.category === "Mobiles" || product?.category === "Laptops") && <div className="show-var">
                            <h5>Select varient</h5>
                            <div className="select-var">
                                <span className={`var ${varient[128] && 'var-active'}`} onClick={() => varientHandler('128')}>128GB</span>
                                <span className={`var ${varient[256] && 'var-active'}`}  onClick={() => varientHandler('256')}>256GB</span>
                                <span className={`var ${varient[512] && 'var-active'}`} onClick={() => varientHandler('512')}>512GB</span>
                                <span className={`var ${varient["1TB"] && 'var-active'}`} onClick={() => varientHandler('1TB')}>1TB</span>
                            </div>
                        </div>}
                        {(product?.category == "Footwears") && <div className="show-size">
                            <h5>Select Size</h5>
                            <div className="select-size">
                                <span className={`sizes text-center ${size.m && 'sizes-active'}`} onClick={() => valueHandler('m')}>7</span>
                                <span className={`sizes text-center${size.l && 'sizes-active'}`} onClick={() => valueHandler('l')}>8</span>
                                <span className={`sizes text-center${size.xl && 'sizes-active'}`} onClick={() => valueHandler('xl')}>9</span>
                                <span className={`sizes text-center${size.xxl && 'sizes-active'}`} onClick={() => valueHandler('xxl')}>10</span>
                            </div>
                        </div>}
                        <div className="show-details">
                            <h5>Product Details</h5>
                            <p>Name : {product?.name}</p>
                            <p>Price : ₹{product?.price}</p>
                            <p>Stock : {product?.stock} only</p>
                            <p>Seller : {product?.seller}</p>
                        </div>
                    </div>
                </div>
                <div className="show-details-footer">
                    <div className="btn btn-md btn-icon" onClick={() => setIsShow(true)}>
                        <span>
                            <FaShoppingCart />
                        </span>
                        Add to Cart
                    </div>
                    <button className="btn btn-md btn-buy" onClick={() => setShow(true)}>
                        <TbPlayerTrackNextFilled />
                        Buy Now
                    </button>
                </div>
                <Popup product={product} isShow={isShow} setIsShow={setIsShow} show={show} setShow={setShow} value={size} valueHandler={valueHandler} cartdata={cartdata} toastVal={setToastVal} varientHandler={varientHandler} varient={varient}/>
                <Toaster/>
                </>
        );
    };
    export default ShowDetails;
