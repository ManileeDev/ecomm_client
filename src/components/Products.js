import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default function Products({ searchVal }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get("/api/products")
        setProducts(response.data.products);
        setLoading(false);

      }
      catch(err){
        console.error("error fetching data:",err)
        setLoading(false);
      }
    };
    fetchData();
      
    // Cleanup function to clear interval
    // return () => clearInterval(interval);
  }, [])

  return (
    <div className="products">
    {loading ? (
        <div>
          <p>Please wait...</p>
          <p>Fetching data...</p>
        </div>
      ) : (
        
          <>{products &&
            products
              .filter((prod) => prod.name.toLowerCase().includes(searchVal.toLowerCase()))
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
              ))}</>
        
      )}
      
    </div>
  )
}
