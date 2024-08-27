import React, { useContext, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { TfiTarget } from "react-icons/tfi";
import { FaPhoneAlt } from "react-icons/fa";
import { AuthContext } from '../context/Authcontext';
import {Toaster,toast} from "react-hot-toast"
import axios from 'axios';
const AddressForm = () => {

    const [address, setAddress] = useState({
        building: "",
        street: "",
        pin: "",
        city: "",
        state: "",
        landmark: "",
        name: "",
        contact: ''
    })

    const {user,dispatch} = useContext(AuthContext)
    const userId = user._id;
    const changeHandler = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('https://vaa3ernrnomwlgmbzfveeyyqpi0cvjau.lambda-url.us-east-1.on.aws/api/address', { address, userId })
            .then(res => {
                toast.success("Address Added Successfully")
                setTimeout(()=>{dispatch({type : "UPDATEUSER",payload : {...user,address}})},1500)
            })
            .catch(err => {
                console.log(err);
            })
    }

    

    return (
        <div className='p-2 mt-2'>
            <div className='d-flex justify-content-between p-2'><span><FaLocationDot className='text-danger' /> <span style={{ fontWeight: "bold" }}>Address</span></span><span style={{ fontWeight: "bold" }}><TfiTarget className='text-danger' /> Use My Location</span></div>
            <form className='address-form' onSubmit={submitHandler}>
                <input type="text" placeholder='Building Name' className='address-input' name='building' value={address.building} onChange={changeHandler} required />
                <input type="text" placeholder='Street' className='address-input' name='street' value={address.street} onChange={changeHandler} required />
                <input type="number" placeholder='Pin Code' className='address-input' name='pin' value={address.pin} onChange={changeHandler} required />
                <div className='d-flex gap-2' >
                    <input type="text" placeholder='City' className='address-input w-50' name='city' value={address.city} onChange={changeHandler} required />
                    <input type="text" placeholder='State' className='address-input w-50' name='state' value={address.state} onChange={changeHandler} required /></div>
                <input type="text" placeholder='LandMark' className='address-input' name='landmark' value={address.landmark} onChange={changeHandler} />
                <div className='p-2 mt-3'>
                    <div className='d-flex justify-content-between p-2'><span style={{ fontWeight: "bold" }}><FaPhoneAlt className='text-danger' /> Contact Details</span></div>
                    <div className='d-flex gap-2'>
                        <input type="text" placeholder='Name' className='address-input w-50' name='name' value={address.name} onChange={changeHandler} />
                        <input type="phone" placeholder='Contact Number' className='address-input w-50' name='contact' value={address.contact} onChange={changeHandler} />
                    </div>
                </div>
                <div className='btn-bottom'><button className='btn btn-buy' type='submit'>Save Contact and Continue</button></div>
            </form>
          <Toaster/>
        </div>
    )
}

export default AddressForm