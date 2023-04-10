import React from 'react'
import style from "./LinksContainer.module.css"
import Link from "./Link/Link"
export default function LinksContainer({links}) {

  var id = 0

  return (
    <div  className={style.container}>{links.map((value)=>{
      return <Link key = {id++} >{value}</Link>
    })}</div>
  )
}
