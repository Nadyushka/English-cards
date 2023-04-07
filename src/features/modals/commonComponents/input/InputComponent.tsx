import React, { ChangeEvent } from 'react'

import styles from 'features/modals/commonComponents/input/InputComponent.module.css'

type InputComponentPropsType = {
  labelName: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  autoFocus: boolean
}

export const InputComponent = ({
  labelName,
  name,
  value,
  onChange,
  autoFocus,
}: InputComponentPropsType) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.inputLabel}>
        {labelName}
      </label>
      <input
        name={name}
        type={'text'}
        className={styles.input}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    </div>
  )
}
