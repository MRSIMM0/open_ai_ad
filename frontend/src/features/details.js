import {createSlice} from '@reduxjs/toolkit'

import {saveToLocalStorage,getLocalStorage} from "./utils"


const detailsSlice = createSlice({
    name:"error",
    initialState: {value: getLocalStorage('details',{response:"",links:[]})},
    reducers:{
        setResponse: (state, action) => {
            state.value.response = action.payload

            saveToLocalStorage("details",state.value)
      
        },
        setLinks: (state, action) => {
            state.value.links = action.payload
            saveToLocalStorage("details",state.value)
       
        }
    }
})
export const {setResponse,setLinks} = detailsSlice.actions;
export default detailsSlice.reducer;