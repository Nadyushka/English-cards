import React, { ChangeEvent, useState, KeyboardEvent, memo } from 'react'

import TextField from '@mui/material/TextField'

import editIcon from './../img/edit.svg'
import s from './../Profile.module.css'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value.trim())
  }
  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }

  return editMode ? (
    <TextField
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      onKeyDown={onEnterHandler}
    />
  ) : (
    <div className={s.spanBlock}>
      <span onDoubleClick={activateEditMode}>{props.value}</span>
      <img src={editIcon} className={s.editIcon} alt={'edit'} onClick={activateEditMode} />
    </div>
  )
})
