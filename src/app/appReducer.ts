import { AppThunk } from 'app/store'
import { handleError } from 'common/utils/error-utils'
import { meTC } from 'features/login/authReducer'

type InitialStateType = typeof initialState

const initialState = {
  isInitialized: false,
  loading: false,
  linearLoading: false,
  errorMessage: '',
  popUpHeaderOpen: false,
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZE_APP':
      return { ...state, isInitialized: action.status }
    case 'SET_ERROR':
      return { ...state, errorMessage: action.errorMessage }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    case 'SET_LINEAR_LOADING':
      return { ...state, linearLoading: action.linearLoading }
    case 'TOGGLE_POP_UP_HEADER':
      return { ...state, popUpHeaderOpen: action.open }
    default:
      return state
  }
}

// types
export type AppActionsType =
  | SetErrorACType
  | SetLoadingACType
  | InitializeAppACType
  | SetLinearLoadingACType
  | popUpHeaderToggleACType
type InitializeAppACType = ReturnType<typeof initializeAppAC>
type SetErrorACType = ReturnType<typeof setErrorAC>
type SetLoadingACType = ReturnType<typeof setLoadingAC>
type SetLinearLoadingACType = ReturnType<typeof setLinearLoadingAC>
type popUpHeaderToggleACType = ReturnType<typeof popUpHeaderToggleAC>

// action creators
export const initializeAppAC = (status: boolean) => ({ type: 'INITIALIZE_APP', status } as const)
export const setErrorAC = (errorMessage: string) => ({ type: 'SET_ERROR', errorMessage } as const)
export const setLoadingAC = (loading: boolean) => ({ type: 'SET_LOADING', loading } as const)
export const setLinearLoadingAC = (linearLoading: boolean) =>
  ({ type: 'SET_LINEAR_LOADING', linearLoading } as const)
export const popUpHeaderToggleAC = (open: boolean) =>
  ({ type: 'TOGGLE_POP_UP_HEADER', open } as const)

// thunk creators
export const initializeAppTC = (): AppThunk => async dispatch => {
  dispatch(setLoadingAC(true))
  try {
    await dispatch(meTC())
  } catch (e) {
    handleError(e, dispatch)
  } finally {
    dispatch(setLoadingAC(false))
    dispatch(initializeAppAC(true))
  }
}
