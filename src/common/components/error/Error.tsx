import React, { useCallback, useEffect, useState } from 'react'

import closeIcon from '../../assets/pictures/icons8-macos-close-30.png'

import styles from './Error.module.css'

import { setErrorAC } from 'app/appReducer'
import { useAppDispatch, useAppSelector } from 'app/store'

type ErrorPropsType = {
  message: string
}

export const Error = ({ message }: ErrorPropsType) => {
  const errorMessage = useAppSelector<string>(state => state.app.errorMessage)
  const [visible, setVisible] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const closeError = useCallback(() => {
    setVisible(false)
    dispatch(setErrorAC(''))
  }, [dispatch])

  useEffect(() => {
    setVisible(true)
    setTimeout(() => {
      closeError()
    }, 6000)
  }, [closeError, errorMessage])

  if (!visible) return null

  return (
    <div className={styles.errorBox}>
      <span className={styles.errorMessage}>{message}</span>
      <img src={closeIcon} alt="closeIcon" className={styles.closeIcon} onClick={closeError} />
    </div>
  )
}
