import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { GiCat } from "react-icons/gi";

export default function Loader(props) {
  const [style, setStyle] = useState({
    opacity: 0,
  });

  const [positions, setPositions] = useState({
    first: { marginBottom: "10px", height: "15px" },
    second: { marginBottom: "10px", height: "15px" },
    third: { marginBottom: "10px", height: "15px" },
    fourth: { marginBottom: "10px", height: "15px" },
  });


  useEffect(() => {
    setTimeout(() => {
      setStyle({ opacity: 1 });
    }, 20);

    let deg = Math.PI / 180;
    let time = 0;
    let max = 13;
    let height = 18;
    let min = 10;

    setInterval(() => {

      setPositions({
        first: {
          marginBottom: `${max * Math.sin(time)}px`,
          height: `${Math.max(height * Math.sin(time + 270 * deg), min)}px`,
        },
        second: {
          marginBottom: `${max * Math.sin(time + 90 * deg)}px`,
          height: `${Math.max(height * Math.sin(time + 180 * deg), min)}px`,
        },
        third: {
          marginBottom: `${max * Math.sin(time + 180 * deg)}px`,
          height: `${Math.max(height * Math.sin(time + 90 * deg), min)}px`,
        },
        fourth: {
          marginBottom: `${max * Math.sin(time + 270 * deg)}px`,
          height: `${Math.max(height * Math.sin(time + 0 * deg), min)}px`,
        },
      });
      time += 15 * deg;
    }, 50);
  }, []);

  return (
    <div style={style} className={styles.loaderContainer}>
      <GiCat className={styles.icon}></GiCat>
      <div className={styles.loaderRow}>
        <span style={positions.first} className={styles.loader}></span>
        <span style={positions.second} className={styles.loader}></span>
        <span style={positions.third} className={styles.loader}></span>
        <span style={positions.fourth} className={styles.loader}></span>
      </div>
    </div>
  );
}
