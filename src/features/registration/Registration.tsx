import React, { ChangeEvent, useState } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { setRegisterTC } from '../login/authReducer'

import s from './Registration.module.css'
import RegistrationInput from './registrationInput/RegistrationInput'

import { setErrorAC } from 'app/appReducer'
import { getErrorMessageSelector, getLoadingSelector } from 'app/appSelectors'
import { useAppDispatch } from 'app/store'
import { Error } from 'common/components/error/Error'
import { Loader } from 'common/components/loader/Loader'
import { PATH } from 'common/components/routes/RoutesComponent'
import { getRegisterSelector } from 'features/login/selectors/loginSelectors'

const Registration = () => {
  const errorMessage = useSelector(getErrorMessageSelector)
  const loading = useSelector(getLoadingSelector)
  const register = useSelector(getRegisterSelector)
  const dispatch = useAppDispatch()

  const [emailValue, setEmailValue] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordCheck, setPasswordCheck] = useState<string>('')

  const ButtonOnClickHandler = () => {
    if (password && passwordCheck) {
      if (password === passwordCheck) {
        if (password.length > 2) {
          dispatch(setRegisterTC(emailValue, password))
        } else {
          dispatch(setErrorAC('Password is not safe. It must be minimum 3 symbols'))
        }
      } else {
        dispatch(setErrorAC('Password is different from the confirmed password'))
      }
    } else {
      dispatch(setErrorAC('Create password and confirm it'))
    }
  }

  // OnChangeHandlers

  const emailOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.currentTarget.value)
  }
  const emailOnBlurHandler = () => {
    const EMAIL_REGEXP =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    !EMAIL_REGEXP.test(emailValue) && dispatch(setErrorAC('Add correct email'))
  }

  const passwordOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const passwordCheckOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.currentTarget.value)
  }

  if (register) {
    return <Navigate to={PATH.PROFILE} />
  } else {
    return (
      <div className={s.registration}>
        {loading && <Loader />}
        <h2>Sign Up</h2>
        <form>
          <RegistrationInput
            type={'email'}
            id={'email'}
            text={'Email'}
            value={emailValue}
            onChange={emailOnChangeHandler}
            onBlur={emailOnBlurHandler}
          />
          <RegistrationInput
            type={'password'}
            id={'password'}
            text={'Password'}
            value={password}
            onChange={passwordOnChangeHandler}
          />
          <RegistrationInput
            type={'password'}
            id={'passwordCheck'}
            text={'Confirm password'}
            value={passwordCheck}
            onChange={passwordCheckOnChangeHandler}
          />
          <button className={s.registration_button} type={'submit'} onClick={ButtonOnClickHandler}>
            Sign Up
          </button>
        </form>
        {errorMessage && <Error message={errorMessage} />}
        <p className={s.registration_haveAccount}>Already have an account?</p>
        <p className={s.registration_loginReference}>
          <NavLink to={PATH.LOGIN}>Sign In</NavLink>
        </p>
      </div>
    )
  }
}

export default Registration
