import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    cartValue : 2
}
const authSlice = createSlice({
    initialState,
    name : "users",
    reducers: {
        login : (state,action)=>{
          return {...state,user : action.payload}
        },
        logout : (state,action)=>{
          return {...state,user : null}
        }
    }
})


export default authSlice.reducer;
export const {login,logout} = authSlice.actions;