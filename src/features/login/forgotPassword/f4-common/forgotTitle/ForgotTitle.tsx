import React from 'react'

import s from './ForgotTitle.module.css'

type PropsType = {
  text: string
}

const ForgotTitle = ({ text }: PropsType) => {
  return <h2 className={s.forgotTitle}>{text}</h2>
}

export default ForgotTitle
