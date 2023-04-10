import React from 'react'


export default function Spacer({height,width}) {
  return (
    <div style={ {minHeight:height?height:"auto", width: width?width:"100%"} } ></div>
  )
}
