import {createSlice} from '@reduxjs/toolkit'




const loadingSlice = createSlice({
    name:"loading",
    initialState: {value: false},
    reducers:{
        toggleLoading: (state, action) => {

            if(action.payload!=undefined){
                state.value = action.payload
            }else{
                state.value = !state.value
            }

        },
      
    }
})
export const {toggleLoading} = loadingSlice.actions;
export default loadingSlice.reducer;