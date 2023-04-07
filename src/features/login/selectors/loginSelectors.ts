import { AppRootStateType } from 'app/store'

export const getIsAuthSelector = (state: AppRootStateType) => state.auth.isAuth
export const getRegisterSelector = (state: AppRootStateType) => state.auth.register
export const getEmailSelector = (state: AppRootStateType) => state.auth.email
export const getUserIdSelector = (state: AppRootStateType) => state.auth._id
export const getLetterWasSentSelector = (state: AppRootStateType) => state.auth.letterWasSent
export const getNewPasswordWasSetSelector = (state: AppRootStateType) =>
  state.auth.newPasswordWasSet
