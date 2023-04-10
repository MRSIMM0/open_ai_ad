export const getLocalStorage = (value,initaialValue)=>{

    const item = localStorage.getItem(value);

    if(item === null || item === undefined){

        localStorage.setItem(value, JSON.stringify(initaialValue));
    }
 

    return JSON.parse(localStorage.getItem(value));
}

export const saveToLocalStorage = (value,payload) =>{
    localStorage.setItem(value, JSON.stringify(payload));
}