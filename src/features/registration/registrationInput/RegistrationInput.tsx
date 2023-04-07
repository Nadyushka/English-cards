import React, { ChangeEvent, useState } from 'react'

import passwordEyeHide from '../../../common/assets/pictures/eye-off.svg'
import passwordEye from '../../../common/assets/pictures/eye.svg'

import s from './RegistrationInput.module.css'

type PropsType = {
  type: string
  id: string
  text: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

const RegistrationInput = (props: PropsType) => {
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const imgOnClickHandler = () => {
    setIsHidden(!isHidden)
  }

  return (
    <div className={s.registration_input}>
      <label htmlFor={props.id} className={s.registrationLabel}>
        {props.text}
      </label>
      <input
        /* eslint-disable-next-line no-nested-ternary */
        type={props.type === 'email' ? 'email' : isHidden ? 'password' : 'text'}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.type === 'password' &&
        (isHidden ? (
          <img
            className={s.registration_eye}
            src={passwordEye}
            onClick={imgOnClickHandler}
            alt={'passwordEye'}
          />
        ) : (
          <img
            className={s.registration_eye}
            src={passwordEyeHide}
            onClick={imgOnClickHandler}
            alt={'passwordEyeHide'}
          />
        ))}
    </div>
  )
}

export default RegistrationInput
