import React from "react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import Button from "../button/Button";

import styles from "./BackButton.module.css"

import { useDispatch } from "react-redux";

import { changeView} from "../../features/view"
import { ViewsNames } from "../../features/constants";

export default function BackButton() {

    const dispatch = useDispatch()

  return (
    <div className={styles.absolute}>
      <Button onClick={()=>{dispatch(changeView(ViewsNames.Main))}}>
        <HiOutlineArrowLeftOnRectangle></HiOutlineArrowLeftOnRectangle>
      </Button>
    </div>
  );
}
