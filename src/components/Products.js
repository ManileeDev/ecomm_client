import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import ProductSkeleton from './ProductSkeleton';

export default function Products({ searchVal }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get("https://server-seven-red.vercel.app/api/products")
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
       <ProductSkeleton/>
      ) : (
        
          <>{products &&
            products
              .filter((prod) => prod.name.toLowerCase().includes(searchVal.toLowerCase()))
              .map((product) => (
                <Link to={`/get-product/${product._id}`} key={product._id} className="prod-card" >
                  <div className='image-container'>
                    <img
                      className="product-front-image"
                      src={product.images[0]}
                      alt='unloaded img'
                    />
                    <img
                      className="product-rear-image"
                      src={product.images[1]}
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
