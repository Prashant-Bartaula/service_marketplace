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
        },
        deleteSuccess:(state)=>{
            state.currentUser=null
        }
    }
})

export const {signInSuccess, signOutSuccess, updateSuccess, deleteSuccess}=userSlice.actions;

export default userSlice.reducer