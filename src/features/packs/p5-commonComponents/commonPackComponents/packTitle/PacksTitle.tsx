import React from 'react'

import s from './PacksTitle.module.css'

type PropsType = {
  title: string
}

export const PacksTitle = ({ title }: PropsType) => {
  return <h2 className={s.packsTitle}>{title}</h2>
}
