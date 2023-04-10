import React, { useState } from "react";
import style from "./Input.module.css";
import { BiRightArrow } from "react-icons/bi";



export default function Input({placeholder,onSubmit,type}) {
  const [text, setText] = useState("");

  return (
    <div onKeyDown={(key)=>{if(key.code==="Enter"){onSubmit(text,setText)}}} className={style.input}>
      <input
        value={text}
        onChange={(el) => setText(el.target.value)}
        placeholder={placeholder}
        type={type?type:"text"}
      />
      <div
        onClick={(event) => {
          onSubmit(text,setText);
        }}
        className={style.button}
      >
        <BiRightArrow />
      </div>
    </div>
  );
}
