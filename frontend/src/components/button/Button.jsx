import React from 'react'
import style from "./Button.module.css"

export default function Button({children,onClick=()=>{}}) {
  return (
    <div onClick={()=>{onClick()}} className={style.button_container}>{children}</div>
  )

}
