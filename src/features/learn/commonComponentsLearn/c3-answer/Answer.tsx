import React from 'react'

import s from './Answer.module.css'

const Answer = ({ answer }: { answer: string }) => {
  return (
    <div className={s.answer}>
      <span className={s.answer_text}>Answer: </span>
      <span className={s.answer_answerText}> {answer}</span>
    </div>
  )
}

export default Answer
