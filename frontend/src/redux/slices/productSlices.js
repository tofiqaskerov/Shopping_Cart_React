import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import { API } from "../../api/api";
const initialState = {
    items:[],
    status: null
};

export const productFetch = createAsyncThunk(
    "products/productsFetch",
    async () =>{
       const response =  await axios.get(`${API}/products`);
       console.log(response);
       return response?.data;
    }

);

const productSlice = createSlice({
    name:  "products",
    initialState,
    reducers: {},
    extraReducers:{
        [productFetch.pending] : (state, action) =>{
            state.status = "pending"
        },
        [productFetch.fulfilled] : (state, action) =>{
            state.status = "success"
            state.items = action.payload
        },
        [productFetch.rejected] : (state, action) =>{
            state.status = "rejected"
        }
    }
})
export default productSlice.reducer