import React, { useContext } from 'react'
import { AuthContext } from '../context/Authcontext';
import { Link } from 'react-router-dom';


const ExistingAddress = () => {
    const { user } = useContext(AuthContext)
    const address = user.address;
    return (
        <div className='address-bg'>
            <p style={{ fontWeight: "bold", color: "rgb(51, 57, 138)" }}>{user.fullname}</p>
            <div className='address-font'>{`${address.building}, ${address.street}, ${address.city}`}</div>
            <div className='address-font'>{`${address.state}-${address.pin}`}</div>
            <div className='address-font'>+91 {user.phone}</div>
            <span className='text-danger'>EDIT</span>
            <div className='btn-address mt-3 text-center'><Link to="/payment"><button className='btn btn-buy' style={{fontSize : "0.9rem"}}>Deliver to this Address</button></Link></div>
        </div>
    )
}

export default ExistingAddress