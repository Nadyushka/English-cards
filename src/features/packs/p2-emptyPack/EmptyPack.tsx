import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { LocalLoader } from '../p5-commonComponents/usefullComponents/localLoader/LocalLoader'

import s from './EmptyPack.module.css'

import { getLoadingSelector } from 'app/appSelectors'
import { useAppDispatch } from 'app/store'
// import { Loader } from 'common/components/loader/Loader'
import { AddUpdateCardModal } from 'features/modals/addUpdateCardModal/AddUpdateCardModal'
import { addCardTC } from 'features/packs/cardsReducer'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { getCardsCountSelector, getPackNameSelector } from 'features/packs/selectors/packsSelectors'

export const EmptyPack = () => {
  const cardsCount = useSelector(getCardsCountSelector)
  const packName = useSelector(getPackNameSelector)
  const isLoading = useSelector(getLoadingSelector)

  const dispatch = useAppDispatch()

  const packId = useParams().packId

  if (cardsCount !== 0) {
    return <Navigate to={`/myPack/${packId}/${packName}`} />
  }

  const addCardOnClickHandler = (
    cardQuestion: string,
    cardAnswer: string,
    questionImg?: string
  ) => {
    packId && dispatch(addCardTC(packId, cardQuestion, cardAnswer, questionImg))
  }

  if (isLoading) return <LocalLoader />

  return (
    <div className={s.emptyPacks_container}>
      <div className={s.emptyPacks}>
        <BackToPackLists />
        <PacksTitle title={packName} />
        <div className={s.emptyPacks_info}>
          This pack is empty. Click add new card to fill this pack
        </div>

        <div style={{ width: '30%', margin: 'auto' }}>
          <AddUpdateCardModal
            type={'add'}
            callBack={addCardOnClickHandler}
            cardQuestion={''}
            cardAnswer={''}
            questionFormatValue={'text'}
            questionImg={''}
          />
        </div>
      </div>
    </div>
  )
}
