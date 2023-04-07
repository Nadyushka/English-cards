import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { sentEmailTC } from '../../authReducer'
import ForgotButton from '../f4-common/forgotButton/ForgotButton'
import ForgotTitle from '../f4-common/forgotTitle/ForgotTitle'

import s from './ForgotPassword.module.css'

import { setErrorAC } from 'app/appReducer'
import { getErrorMessageSelector, getLoadingSelector } from 'app/appSelectors'
import { useAppDispatch } from 'app/store'
import { Error } from 'common/components/error/Error'
import { Loader } from 'common/components/loader/Loader'
import { PATH } from 'common/components/routes/RoutesComponent'
import { getLetterWasSentSelector } from 'features/login/selectors/loginSelectors'

export const ForgotPassword = () => {
  const isLoading = useSelector(getLoadingSelector)
  const errorMessage = useSelector(getErrorMessageSelector)
  const letterWasSent = useSelector(getLetterWasSentSelector)

  const dispatch = useAppDispatch()

  const [email, setEmail] = useState<string>('')

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const buttonOnClickHandler = () => {
    const EMAIL_REGEXP =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if (EMAIL_REGEXP.test(email)) {
      dispatch(sentEmailTC(email))
    } else {
      dispatch(setErrorAC('Invalid email'))
    }
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      buttonOnClickHandler()
    }
  }

  if (letterWasSent) {
    return <Navigate to={PATH.UPDATE_PASSWORD_INFO} />
  }

  return (
    <div className={s.forgotPassword}>
      <div className={s.forgotPassword_container}>
        {isLoading && <Loader />}
        <ForgotTitle text={'Forgot your password?'} />
        <input
          placeholder={'Email'}
          value={email}
          onChange={onInputChange}
          onKeyDown={onEnterHandler}
        />
        <p className={s.forgotPassword_instruction}>
          Enter your email address and we will send you further instructions{' '}
        </p>
        {errorMessage && <Error message={errorMessage} />}
        <ForgotButton onClick={buttonOnClickHandler} text={'Send Instructions'} />
        <p className={s.forgotPassword_backToLogin}>Did you remember your password?</p>
        <div className={s.forgotPassword_backToLoginLink}>
          <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
        </div>
      </div>
    </div>
  )
}
