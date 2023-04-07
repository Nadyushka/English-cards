import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'app/store'
import learnPack from 'common/assets/pictures/addPack.svg'
import { PATH } from 'common/components/routes/RoutesComponent'
import { AddUpdatePackModal } from 'features/modals/addUpdatePackModal/AddUpdatePackModal'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'
import s from 'features/packs/p4-myPacks/popup/Popup.module.css'
import { deletePackTC } from 'features/packs/packsReducer'

type Props = {
  packId: string | undefined
  packName: string
  isPrivate: boolean
  deckCover: string
  updatePack: (newPackName: string, isPrivate: boolean, newDeckCover: string) => void
}

export const Popup = ({ packId, packName, isPrivate, deckCover, updatePack }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const learnOnClickHandler = (packType: 'my' | 'friend') => {
    navigate(`/learn/${packId}/${packName}/${packType}`)
  }

  const updateOnClickHandler = (newPackName: string, isPrivate: boolean, newDeckCover: string) => {
    updatePack(newPackName, isPrivate, newDeckCover)
  }

  const deleteOnClickHandler = (packId: string) => {
    const promise = dispatch(deletePackTC(packId!))

    promise.then(() => {
      navigate(PATH.PACKS_ALL)
    })
  }

  return (
    <div className={s.popupBox}>
      <div className={s.rowItem}>
        <img
          src={learnPack}
          alt={'learnIcon'}
          onClick={() => learnOnClickHandler('my')}
          className={s.learn}
        ></img>
        <span onClick={() => learnOnClickHandler('my')}>Learn</span>
      </div>
      <div className={s.rowItem}>
        <AddUpdatePackModal
          type={'update'}
          callBack={updateOnClickHandler}
          packName={packName}
          isPrivate={isPrivate}
          deckCover={deckCover}
        />
        <span>Edit</span>
      </div>
      <div className={s.rowItem}>
        <DeleteModal
          type={'pack'}
          title={packName}
          deleteCallBack={() => deleteOnClickHandler(packId!)}
        />
        <span>Delete</span>
      </div>
    </div>
  )
}
