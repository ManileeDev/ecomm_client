import { createContext, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (state,action) => {
    switch(action.type){
        case "UPDATE_CART" :
            return {cart : action.payload}
        case "CLEAR_CART" :
            return {cart : []}
        default :
          return state
    }
}

export const CartContextProvider = ({children})=>{
   const[state,dispatch] = useReducer(cartReducer,{
    cart : []
   })

   return(
    <CartContext.Provider value={{...state,dispatch}}>
        {children}
    </CartContext.Provider>
   )
}