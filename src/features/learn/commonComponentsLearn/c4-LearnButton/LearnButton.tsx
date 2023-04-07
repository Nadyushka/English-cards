import React from 'react'

import s from './LearnButton.module.css'

type PropsType = {
  title: string
  onClick: () => void
}

const LearnButton = ({ title, onClick }: PropsType) => {
  return (
    <button onClick={onClick} className={s.learnButton}>
      {title}
    </button>
  )
}

export default LearnButton
