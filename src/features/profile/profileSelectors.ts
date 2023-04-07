import { AppRootStateType } from 'app/store'

export const getName = (state: AppRootStateType) => state.auth.name
