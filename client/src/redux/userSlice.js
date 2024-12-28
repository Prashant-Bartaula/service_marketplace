import {createSlice} from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInSuccess:(state, action)=>{
            state.currentUser=action.payload
        },
        signOutSuccess:(state)=>{
            state.currentUser=null;
        },
        updateSuccess:(state, action)=>{
            state.currentUser=action.payload
        }
    }
})

export const {signInSuccess, signOutSuccess}=userSlice.actions;

export default userSlice.reducer