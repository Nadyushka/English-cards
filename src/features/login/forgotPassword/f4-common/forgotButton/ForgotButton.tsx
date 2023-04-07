import React from 'react'

import s from './ForgotButton.module.css'

type PropsType = {
  text: string
  onClick: () => void
}

const ForgotButton = ({ text, onClick }: PropsType) => {
  return (
    <button onClick={onClick} className={s.forgotButton}>
      {text}
    </button>
  )
}

export default ForgotButton
