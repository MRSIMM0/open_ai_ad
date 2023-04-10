import React, { useEffect } from "react";
import styles from "./Image.module.css";

export default function Image({ min_width, width, url }) {



  return (
    <div
      style={{
        width: width ? width : "10px",
        backgroundImage: url ? `url("${url}")` : "",
      }}
      className={styles.image}
    ></div>
  );
}
