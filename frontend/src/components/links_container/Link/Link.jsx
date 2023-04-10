import React from "react";
import styles from "./Link.module.css";

import { AiOutlineDelete } from "react-icons/ai";
import { BiRedo } from "react-icons/bi";

import { useDispatch } from "react-redux";

import { removeLink } from "../../../features/links";

export default function Link({ children }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.link}>
      <div href={children} className={styles.padding}>
        {children.split("/")[2]}
      </div>
      <div className={styles.icons}>
        <BiRedo
          className={styles.ico}
          onClick={() => {
            window.open(children, "_blank");
          }}
          enableBackground="true"
        ></BiRedo>
        <AiOutlineDelete
          className={styles.ico}
          onClick={() => {
            dispatch(removeLink(children));
          }}
          enableBackground="true"
        ></AiOutlineDelete>
      </div>
    </div>
  );
}
