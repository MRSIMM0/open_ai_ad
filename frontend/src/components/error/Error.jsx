import React, { useEffect, useState } from 'react'
import styles from "./Error.module.css"

import {useSelector, useDispatch} from 'react-redux'
import {clearError} from "../../features/error" 

export default function Error({message}) {
    const dispatch = useDispatch();

    const [style,setStyle] = useState({bottom:"0px",transition: "all 200ms ease-out",});

    useEffect(()=>{
        
        setTimeout(()=>{setStyle({...style,bottom:"50px",opacity:"1"})},200)
        setTimeout(()=>{
            setStyle({...style,bottom:"0px",opacity:"0"})
        },1700)
        setTimeout(()=>{
            dispatch(clearError())
        },2000)

    },[])

   

  return (
    <div style={style} className={styles.error} >{message}</div>
  )
}
