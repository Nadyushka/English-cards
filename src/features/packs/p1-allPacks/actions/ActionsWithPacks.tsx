import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './ActionsWithPacks.module.css'

import { setLinearLoadingAC } from 'app/appReducer'
import { useAppDispatch } from 'app/store'
import learnPack from 'common/assets/pictures/addPack.svg'
import { getPacksUtils } from 'common/utils/getPacks-utils'
import { AddUpdatePackModal } from 'features/modals/addUpdatePackModal/AddUpdatePackModal'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'
import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'

type PropsType = {
  isVisible: boolean
  packId: string
  userId: string
  packName: string
  cardsNumber: number
  isPrivate: boolean
  deckCover: string
}

export const ActionsWithPacks = ({
  isVisible,
  packId,
  userId,
  packName,
  isPrivate,
  cardsNumber,
  deckCover,
}: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const PacksTypeLocalStorage = localStorage.getItem('PackType')
    ? localStorage.getItem('PackType')
    : 'AllPacks'
  const isMyPacks = PacksTypeLocalStorage !== 'AllPacks'

  const deleteOnClickHandler = () => {
    const promise = dispatch(deletePackTC(packId))

    getPacksUtils(isMyPacks, dispatch, promise, userId)
  }

  const updateOnClickHandler = (packName: string, isPrivate: boolean, newDeckCover: string) => {
    const promise = dispatch(updatePackTC(packId, packName, isPrivate, newDeckCover))

    getPacksUtils(isMyPacks, dispatch, promise, userId)
  }

  const learnOnClickHandler = (packType: 'my' | 'friend') => {
    navigate(`/learn/${packId}/${packName}/${packType}`)
  }

  if (!isVisible) {
    return (
      <div className={s.actionsWithPacks}>
        <button disabled={cardsNumber === 0} onClick={() => learnOnClickHandler('friend')}>
          <img
            src={learnPack}
            alt={'learnIcon'}
            className={cardsNumber !== 0 ? s.actionsWithPacks_active : s.actionsWithPacks_inactive}
          ></img>
        </button>
      </div>
    )
  }

  return (
    <div className={s.actionsWithPacks}>
      <button disabled={cardsNumber === 0} onClick={() => learnOnClickHandler('my')}>
        <img
          src={learnPack}
          alt={'learnIcon'}
          className={cardsNumber !== 0 ? s.actionsWithPacks_active : s.actionsWithPacks_inactive}
        ></img>
      </button>

      <AddUpdatePackModal
        type={'update'}
        callBack={updateOnClickHandler}
        packName={packName}
        isPrivate={isPrivate}
        deckCover={deckCover}
      />

      <DeleteModal type={'pack'} title={packName} deleteCallBack={deleteOnClickHandler} />
    </div>
  )
}
