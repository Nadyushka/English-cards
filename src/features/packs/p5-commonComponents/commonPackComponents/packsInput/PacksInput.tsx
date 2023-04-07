import React, { ChangeEvent } from 'react'

import s from './PacksInput.module.css'

import searchIcon from 'common/assets/pictures/searchIcon.svg'

type PropsType = {
  id: string
  text: string
  type: string
  value: string
  width: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PacksInput = ({ id, text, type, value, onChange, width }: PropsType) => {
  return (
    <form className={s.packsInputForm}>
      <label htmlFor={id} className={s.packsLabel}>
        {text}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={s.packsInput}
        style={{ background: `url(${searchIcon}) no-repeat 10px 10px`, width: width }}
        placeholder={'Provide your text'}
      />
    </form>
  )
}
