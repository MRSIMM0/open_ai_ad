import React, { useEffect, useState } from 'react'

import styles from "./Text.module.css"

export default function Text({children}) {



  return (
    <div id="text"  className={styles.text}>{children?children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ad, corporis harum aspernatur fuga distinctio labore eos iste numquam esse at tempora aut repellendus. Reiciendis consequatur nam atque sit ad?"}</div>
  )
}
