import {createSlice} from "@reduxjs/toolkit"
import {toast} from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(i => i.id === action.payload.id)

            if (itemIndex >= 0) {
                const qunatity = state.cartItems[itemIndex].cartQuantity += 1
                console.log(qunatity);
                toast.info(`increased ${state.cartItems[itemIndex].name} quantity`, {
                    position: "top-left"
                });

            } else {
                const tempProduct = {
                    ...action.payload,
                    cartQuantity: 1
                }
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} to cart`, {
                    position: "top-left"
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems)) // cartItemleri localStoragede saxlayiram


        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)

            state.cartItems = nextCartItems
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
            toast.error(` ${action.payload.name} removed from cart`, {
                position: "top-left"
            });
        },
        decreaseCart(state, action){
            const itemIndex =  state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id)
            if(state.cartItems[itemIndex].cartQuantity >1){
                state.cartItems[itemIndex].cartQuantity -=1
                toast.info(`Decreased ${action.payload.name} cart quantity`, {
                    position: "top-left"
                });
            }else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);
                state.cartItems = nextCartItems;
                toast.error(` ${action.payload.name} removed from cart`, {
                    position: "top-left"
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        clearCart(state){
            state.cartItems = [];
            toast.error(`Cart cleared`, {
                position: "top-left"
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        totalPrice(state,action){
            let {total, quantity} = state.cartItems.reduce((totalCart, cartItem) =>{
                const {price, cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;
                totalCart.total +=itemTotal
                totalCart.quantity += cartQuantity

                return totalCart
            },
            {
                total:0,
                quantity:0
            } );

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total            
        }

    }
})

export const {addToCart,removeFromCart,decreaseCart, clearCart, totalPrice} = cartSlice.actions

export default cartSlice.reducer