import { AppRootStateType } from 'app/store'

export const getIsInitializeSelector = (state: AppRootStateType) => state.app.isInitialized
export const getLoadingSelector = (state: AppRootStateType) => state.app.loading
export const getLinearLoadingSelector = (state: AppRootStateType) => state.app.linearLoading
export const getErrorMessageSelector = (state: AppRootStateType) => state.app.errorMessage
