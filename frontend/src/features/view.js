import {createSlice} from '@reduxjs/toolkit'
import MainPage from '../pages/MainPage/MainPage';
import {getLocalStorage,saveToLocalStorage} from "./utils"
import { ViewsNames } from './constants';

const viewSlice = createSlice({
    name:"view",
    initialState: {value: getLocalStorage('view', ViewsNames.Login)},
    reducers:{
        changeView: (state, action) => {
            state.value = action.payload
            saveToLocalStorage('view', state.value)
        },
      
    }
})
export const {changeView} = viewSlice.actions;
export default viewSlice.reducer;