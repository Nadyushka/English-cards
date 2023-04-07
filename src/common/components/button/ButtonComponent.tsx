import React from 'react'

import styles from './Button.module.css'

type ButtonPropsType = {
  name: string
  callBack: () => void
  style?: {}
  disabled?: boolean
}
export const ButtonComponent = ({ name, callBack, style, disabled }: ButtonPropsType) => {
  const onClickHandler = () => {
    callBack()
  }

  return (
    <div>
      <button
        onClick={onClickHandler}
        type={'button'}
        className={styles.btn}
        style={style}
        disabled={disabled}
      >
        {name}
      </button>
    </div>
  )
}
