import React from 'react'

import s from './Title.module.css'

type TitlePropsType = {
  condition: boolean
  firstTitle: string
  secondTitle: string
}

export const Title = ({ condition, firstTitle, secondTitle }: TitlePropsType) => {
  return (
    <div className={s.titleBox}>
      <h1 className={s.title}>{condition ? firstTitle : secondTitle}</h1>
    </div>
  )
}
