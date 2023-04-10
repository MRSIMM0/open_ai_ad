import React, { useEffect, useState } from "react";
import Row from "../../layout/row/Row";
import Spacer from "../../layout/sapcer/Spacer";
import styles from "./Carusel.module.css";
import Image from "./image/Image";
import { HiArrowUturnLeft, HiArrowUturnRight } from "react-icons/hi2";

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

export default function Carusel({ links }) {
  const [offsetLesft, setOffsetLeft] = useState("0px");
  const [offsetRight, setOffsetRight] = useState("0px");
  const [caruselWidth, setCaruselWidth] = useState("0px");

  let [position, setPosition] = useState(0);

  const scrollLeft = () => {
    setPosition(--position);
    document.getElementById("carusel").scrollLeft = position * caruselWidth;
  };

  const scrollRight = () => {
    setPosition(++position);
    document.getElementById("carusel").scrollLeft = position * caruselWidth;
  };

  useEffect(() => {
    const handleResize = () => {
      if (document.getElementById("container")!=null) {
        let carusel = document.getElementById("carusel").offsetHeight;
        let children = document.getElementById("container").children;
        const off = (carusel - children[0].offsetHeight) / 2;
        setOffsetRight(off - document.getElementById("carusel").scrollLeft);
        setOffsetLeft(off + document.getElementById("carusel").scrollLeft);
        setCaruselWidth(carusel);
      }
    };
    handleResize();

    let carusel = document.getElementById("carusel");

    window.addEventListener("resize", handleResize);
    carusel.addEventListener("scroll", handleResize);
  });

  // const links = [
  //   "https://www.w3schools.com/html/pic_trulli.jpg",
  //   "https://www.w3schools.com/html/pic_trulli.jpg",
  //   "https://www.w3schools.com/html/pic_trulli.jpg",
  //   "https://www.w3schools.com/html/pic_trulli.jpg",
  // ];

  let id = 0;
  return (
    <div id="carusel" className={styles.carusel}>
      {links.map((el) => {
        return (
          <div id="container" className={styles.imageContainer}>
            <Image id={id++} width="90%" url={el}></Image>
          </div>
        );
      })}
      {position !== links.length - 1 ? (
        <div
          onClick={() => {
            scrollRight();
          }}
          style={{ right: offsetRight }}
          className={styles.arrowRight}
        >
          <MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight>
        </div>
      ) : (
        ""
      )}
      {position !== 0 ? (
        <div
          onClick={() => {
            scrollLeft();
          }}
          style={{ left: offsetLesft }}
          className={styles.arrowLeft}
        >
          <MdOutlineKeyboardArrowLeft></MdOutlineKeyboardArrowLeft>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
