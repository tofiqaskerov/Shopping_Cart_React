import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { productsApi, useGetAllProductsQuery } from '../../redux/productsApi'
import { addToCart } from '../../redux/slices/cartSlices'
import './home.scss'
const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery()
  const dispatch = useDispatch()
  const history = useNavigate()
  const handleAddToCart = (product) =>{
      dispatch(addToCart(product))
      history.push("/cart");
  }
  return (
    <div className="home__container">
      {isLoading ? <p>Loading...</p> : error ? <p>An error  occured {error.data}</p> :
        <>
          <h2>New Arrivals</h2>
          <div className="products row">
            {data?.map(product =>
              <div key={product.id} className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div  className='product'>
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className='price'>${product.price}</span>
                  </div>
                  <button onClick={() =>handleAddToCart(product)}>Add To Cart</button>
                </div>
              </div>

            )}
          </div>
        </>
      }
    </div>
  )
}

export default Home