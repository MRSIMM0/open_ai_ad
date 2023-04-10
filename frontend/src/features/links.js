import {createSlice} from '@reduxjs/toolkit'

import {getLocalStorage,saveToLocalStorage } from "./utils"


const linksSlice = createSlice({
    name:"links",
    initialState: {value: getLocalStorage("links-value",[])},
    reducers:{
        addLink: (state, action) => {
            if(Array.isArray(action.payload)){
                action.payload.forEach(el=>{
                    state.value.push(el);
                })
            }else{
                state.value.push(action.payload)
            }

            saveToLocalStorage("links-value",state.value)
        },
        removeLink: (state, action) => {
            const x = state.value.indexOf(action.payload)
            state.value.splice(x,1);
            saveToLocalStorage("links-value",state.value)
        },
        clearLinks:(state,payload) =>{
            state.value = []
            saveToLocalStorage("links-value",state.value)
        }

    }
})
export const {addLink,clearLinks,removeLink} = linksSlice.actions;
export default linksSlice.reducer;