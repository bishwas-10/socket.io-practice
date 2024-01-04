import { createSlice } from "@reduxjs/toolkit";



  
export interface RoomProps{
 room:string ;
 
}
const initialState:RoomProps={
   room:"JavaScript"
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setSelectedRoom(state,action){
            state.room = action.payload
        }

    }
})

export const{
    setSelectedRoom

}= authSlice.actions;
export default authSlice.reducer;