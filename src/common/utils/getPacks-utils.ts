import { AppThunkDispatchType } from 'app/store'
import { getPacksTC } from 'features/packs/packsReducer'

export const getPacksUtils = (
  isMyPacks: boolean,
  dispatch: AppThunkDispatchType,
  promise: Promise<void>,
  userId: string
) => {
  if (!isMyPacks) {
    promise.then(() => {
      dispatch(getPacksTC({}))
    })
  } else {
    promise.then(() => {
      dispatch(getPacksTC({ user_id: userId }))
    })
  }
}
