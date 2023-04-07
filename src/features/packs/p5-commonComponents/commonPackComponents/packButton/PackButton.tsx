import React from 'react'

import s from './PackButton.module.css'

type PropsType = {
  name: string
  onClick: () => void
  disable?: boolean
}

export const PackButton = ({ name, onClick, disable }: PropsType) => {
  return (
    <button disabled={disable} className={s.packButton} onClick={onClick}>
      {name}
    </button>
  )
}
