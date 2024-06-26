import React, { useContext, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import AddressForm from '../components/AddressForm';
import ExistingAddress from '../components/ExistingAddress';
import { AuthContext } from '../context/Authcontext';

const Address = () => {
    const { user } = useContext(AuthContext)
    const [showform, setShowform] = useState(false)
    return (
        <>
            <div className='d-flex gap-4 py-2 px-4 head-nav'><Link to="/cart" className='text-white'><IoIosArrowBack /></Link>ADDRESS</div><hr />
            <div className='cart-nav'>
                <div className='nav-pages'><div className='nav-pages-num'>1</div><div>Cart</div></div>
                <div className='nav-pages'><div className='nav-pages-num'>2</div><div>Address</div></div>
                <div className='nav-pages'><div className='nav-pages-num'>3</div><div>Payment</div></div>
            </div>
            <hr />
            {user.address &&
                <> <div className='p-3'>
                    <span onClick={() => setShowform(!showform)} style={{ fontWeight: "bold", color: "red" }}><FaPlus />ADD NEW ADDRESS</span>
                </div><ExistingAddress />
                </>}
            {!user.address &&
                <AddressForm />} </>

    )
}

export default Address