import React, { ChangeEvent } from 'react'

import styles from 'features/modals/commonComponents/checkbox/CheckBoxComponent.module.css'

type CheckBoxComponentPropsType = {
  id: string
  labelName: string
  name: string
  type: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CheckBoxComponent = ({
  id,
  labelName,
  name,
  type,
  checked,
  onChange,
}: CheckBoxComponentPropsType) => {
  return (
    <div className={styles.checkBoxContainer}>
      <input
        id={id}
        name={name}
        type={type}
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name} className={styles.rememberMeLabel}>
        {labelName}
      </label>
    </div>
  )
}
