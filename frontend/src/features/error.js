import {createSlice} from '@reduxjs/toolkit'




const errorSlice = createSlice({
    name:"error",
    initialState: {value: ""},
    reducers:{
        setError: (state, action) => {
            state.value = action.payload
        },
        clearError: (state, action) => {
            state.value = ''
        }
    }
})
export const {setError,clearError} = errorSlice.actions;
export default errorSlice.reducer;