import React from 'react'
import style from "./Row.module.css"

export default function Row({children, height, width}) {
  return (
    <div style={ {height:height?height:"auto", width: width?width:"auto", minHeight:height?height:"auto"} } className={style.row}>
        {children}
    </div>
  )
}
