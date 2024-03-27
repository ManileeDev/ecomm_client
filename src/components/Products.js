import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default function Products({ searchVal }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4500/api/products").then(result => setProducts(result.data.products)).catch(err => console.log(err))
  }, [])

  return (
    <div className="products">
      {products &&
        products
          .filter((prod) => prod.name.toLowerCase().includes(searchVal))
          .map((product) => (
            <Link to={`/get-product/${product._id}`} key={product._id} className="prod-card" >
              <div className='image-container'>
                <img
                  className="product-image"
                  src={product.images[0]}
                  alt='unloaded img'
                />
              </div>
              <div className="product-name">{product.name}</div>
              <div className="product-price">₹{product.price}/-</div>
              <div>
                <button className="product-add-btn">Add to Cart</button>
              </div>
            </Link>
          ))}
    </div>
  )
}
