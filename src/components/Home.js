import React, { useContext, useEffect, useState } from 'react'
import Search from './Search'
import Products from './Products'
import toast, { Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/Authcontext'
import Footer from './Footer'
import Navbar from './Navbar'


export default function Home() {

  const [searchVal, setSearchVal] = useState("")

  const {user} = useContext(AuthContext)
  
  useEffect(()=>{
    if(user){toast.success("Login Successfull")}
  },[user])
 
  return (
    <div className='home'>
      <Navbar/>
     <Search searchVal={setSearchVal}/> 
     <Products searchVal={searchVal}/>
     <Toaster/>
     <Footer />
    </div>
  )
}
