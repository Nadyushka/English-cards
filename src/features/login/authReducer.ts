import { AxiosError } from 'axios'

import { authAPI, ChangeDataResponseType, LoginRequestType, UserResponseType } from './authAPI'

import { setLoadingAC } from 'app/appReducer'
import { AppThunk } from 'app/store'
import { handleError } from 'common/utils/error-utils'

type InitialStateType = typeof initialState

const initialState = {
  _id: '',
  email: '',
  name: '',
  avatar: '' as string | undefined,
  publicCardPacksCount: 0,
  // количество колод

  created: null as Date | null,
  updated: null as Date | null,
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  error: '',
  isAuth: false,
  register: false,
  letterWasSent: false,
  newPasswordWasSet: false,
}

// reducer
export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.payload.data,
        isAuth: action.payload.value,
      }
    case 'SET_REGISTER':
      return { ...state, register: action.register }
    case 'forgot/SENT_LETTER':
      return { ...state, letterWasSent: action.letterWasSent }
    case 'forgot/SET_EMAIL':
      return { ...state, email: action.email }
    case 'forgot/SET_NEW_PASSWORD':
      return { ...state, newPasswordWasSet: action.newPasswordWasSet }
    case 'CHANGE_DATA':
      return {
        ...state,
        name: action.payload.data.name ?? '',
        avatar: action.payload.data.avatar,
        updated: action.payload.data.updated,
      }
    default:
      return state
  }
}

//types
export type AuthActionsType =
  | LoginACType
  | ChangeDataACType
  | SetRegisterACType
  | SetEmailACType
  | SentSentLetterACType
  | SetNewPasswordACType
type LoginACType = ReturnType<typeof loginAC>
type SetRegisterACType = ReturnType<typeof setRegisterAC>
type ChangeDataACType = ReturnType<typeof changeDataAC>
type SetEmailACType = ReturnType<typeof setEmailAC>
type SentSentLetterACType = ReturnType<typeof sentSentLetterAC>
type SetNewPasswordACType = ReturnType<typeof setNewPasswordAC>

export type ErrorType = {
  error: string
}
type changeDataACType = ChangeDataResponseType & {
  updated: null | Date
}

// action creators
const loginAC = (data: UserResponseType | InitialStateType, value: boolean) => {
  return {
    type: 'LOGIN',
    payload: {
      data,
      value,
    },
  } as const
}

const changeDataAC = (data: changeDataACType) => {
  return {
    type: 'CHANGE_DATA',
    payload: {
      data,
    },
  } as const
}

export const setRegisterAC = (register: boolean) => ({ type: 'SET_REGISTER', register } as const)
const setEmailAC = (email: string) => ({ type: 'forgot/SET_EMAIL', email } as const)
const sentSentLetterAC = (letterWasSent: boolean) =>
  ({ type: 'forgot/SENT_LETTER', letterWasSent } as const)
const setNewPasswordAC = (newPasswordWasSet: boolean) =>
  ({ type: 'forgot/SET_NEW_PASSWORD', newPasswordWasSet } as const)

// thunk creators
export const loginTC =
  (data: LoginRequestType): AppThunk =>
  async dispatch => {
    dispatch(setLoadingAC(true))
    try {
      const res: UserResponseType = await authAPI.login(data)

      dispatch(loginAC(res, true))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLoadingAC(false))
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setLoadingAC(true))
  try {
    const res = await authAPI.logout()

    if (res.statusText === 'OK') {
      dispatch(loginAC(initialState, false))
    }
  } catch (e) {
    handleError(e, dispatch)
  } finally {
    dispatch(setLoadingAC(false))
  }
}

export const meTC = (): AppThunk => async dispatch => {
  dispatch(setLoadingAC(true))
  try {
    const res = await authAPI.me()

    dispatch(loginAC(res, true))
    dispatch(setRegisterAC(true))
  } catch (e) {
    // handleError(e, dispatch)
  } finally {
    dispatch(setLoadingAC(false))
  }
}

export const setRegisterTC =
  (email: string, password: string): AppThunk =>
  dispatch => {
    dispatch(setLoadingAC(true))
    let data = { email, password }

    authAPI
      .register(data)
      .then(() => {
        dispatch(setRegisterAC(true))
      })
      .catch(e => {
        handleError(e, dispatch)
      })
      .finally(() => dispatch(setLoadingAC(false)))
  }

export const changeDataTC =
  (data: ChangeDataResponseType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.changeData(data)

      if (res.statusText === 'OK') {
        const { data } = res

        dispatch(
          changeDataAC({
            name: data.updatedUser.name,
            avatar: data.updatedUser.avatar,
            updated: data.updatedUser.updated,
          })
        )
      }
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const sentEmailTC =
  (email: string): AppThunk =>
  dispatch => {
    dispatch(setLoadingAC(true))
    dispatch(sentSentLetterAC(false))
    dispatch(setNewPasswordAC(false))
    dispatch(setEmailAC(''))

    return authAPI
      .forgot(email)
      .then(() => {
        dispatch(sentSentLetterAC(true))
        dispatch(setEmailAC(email))
      })
      .catch(e => {
        handleError(e, dispatch)
      })
      .finally(() => dispatch(setLoadingAC(false)))
  }

export const updatePasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  dispatch => {
    dispatch(setLoadingAC(true))

    return authAPI
      .setNewPasswordRequest(password, resetPasswordToken)
      .then(() => {
        setEmailAC('')
        dispatch(setNewPasswordAC(true))
      })
      .catch(e => {
        handleError(e, dispatch)
      })
      .finally(() => dispatch(setLoadingAC(false)))
  }
