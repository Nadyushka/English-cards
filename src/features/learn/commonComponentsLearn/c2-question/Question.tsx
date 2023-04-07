import React from 'react'

import s from './Question.module.css'

type PropsType = {
  question: string
  shots: number
  questionImg: string
}

export const Question = ({ question, shots, questionImg }: PropsType) => {
  return (
    <div className={s.question}>
      <span className={s.question_text}>Question: </span>
      <br />
      {questionImg ? (
        <div className={s.questionImgBox}>
          <img src={questionImg} alt="" className={s.questionImg} />
        </div>
      ) : (
        <div>{question}</div>
      )}
      <div
        className={s.question_attempts}
      >{`Number of attempts to answer the question: ${shots}`}</div>
    </div>
  )
}
