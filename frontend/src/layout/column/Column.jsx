import React from 'react'
import style from './Column.module.css'

export default function Column({children, height, width, center}) {
  return (
    <div style={ {height:height?height:"auto", minHeight:height?height:"auto" , maxWidth:width?width:"auto", justifyContent:center?"center":'start'} } className={style.column}>{children}</div>
  )
}
