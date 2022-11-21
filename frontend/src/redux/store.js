import {configureStore}  from '@reduxjs/toolkit'
import productReducer, { productFetch } from './slices/productSlices'
import cartReducer, {totalPrice} from './slices/cartSlices'
import { productsApi } from './productsApi';

const store = configureStore({
    reducer:{
        products: productReducer,
        cart: cartReducer,
        [productsApi.reducerPath] : productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>{
       return getDefaultMiddleware().concat(productsApi.middleware);
    }
})
store.dispatch(productFetch())
store.dispatch(totalPrice())
export default store