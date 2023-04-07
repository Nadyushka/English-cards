import React, { ChangeEvent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useDebouncedEffect from 'use-debounced-effect'

import { LocalLoader } from '../p5-commonComponents/usefullComponents/localLoader/LocalLoader'

import s from './FriendsPack.module.css'

import { popUpHeaderToggleAC } from 'app/appReducer'
import { getLoadingSelector } from 'app/appSelectors'
import { useAppDispatch } from 'app/store'
import defaultCover from 'common/assets/pictures/noCoverImg-resized.jpeg'
import { getCardsTC } from 'features/packs/cardsReducer'
import { FriendsPackTable } from 'features/packs/p3-friendsPacks/friendsPackTable/FriendsPackTable'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { PackButton } from 'features/packs/p5-commonComponents/commonPackComponents/packButton/PackButton'
import { PacksInput } from 'features/packs/p5-commonComponents/commonPackComponents/packsInput/PacksInput'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { SuperPagination } from 'features/packs/p5-commonComponents/commonPackComponents/pagination/SuperPagination'
import { getPacksTC } from 'features/packs/packsReducer'
import {
  getButtonDisableSelector,
  getCardPageCountSelector,
  getCardPageSelector,
  getCardsDataSelector,
  getCardTotalCountSelector,
  getMaxCardsCountSelector,
  getMinCardsCountSelector,
  getPackDeckCoverSelector,
} from 'features/packs/selectors/packsSelectors'

export const FriendsPack = () => {
  const dispatch = useAppDispatch()
  const tableData = useSelector(getCardsDataSelector)
  const isLoading = useSelector(getLoadingSelector)
  const page = useSelector(getCardPageSelector)
  const pageCount = useSelector(getCardPageCountSelector)
  const totalCount = useSelector(getCardTotalCountSelector)
  const min = useSelector(getMinCardsCountSelector)
  const max = useSelector(getMaxCardsCountSelector)
  const buttonDisableBecauseProcess = useSelector(getButtonDisableSelector)
  const packDeckCover = useSelector(getPackDeckCoverSelector)

  const [inputValue, setInputValue] = useState<string>('')

  const navigate = useNavigate()
  let { packId, packName } = useParams()

  dispatch(popUpHeaderToggleAC(false))

  const inputOnChaneHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value)

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(getPacksTC({ page: newPage, pageCount: newCount, packName: inputValue, min, max }))
  }

  const learnOnClickButtonHandler = () => {
    navigate(`/learn/${packId}/${packName}`)
  }

  useEffect(() => {
    dispatch(popUpHeaderToggleAC(false))
    packId && dispatch(getCardsTC({ cardsPack_id: packId }))
  }, [packId])

  useDebouncedEffect(
    () => {
      dispatch(getCardsTC({ cardQuestion: inputValue, cardsPack_id: packId }))
    },
    800,
    [inputValue]
  )

  return (
    <div className={s.friendsPack}>
      <div className={s.friendsPack_container}>
        <BackToPackLists />
        <div className={s.friendsPack_titleAndButton}>
          <PacksTitle title={`Friend’s Pack: ${packName}`} />
          <PackButton
            disable={buttonDisableBecauseProcess}
            name={'Learn to pack'}
            onClick={learnOnClickButtonHandler}
          />
        </div>
        <div className={s.deckCoverBox}>
          {!packDeckCover ? (
            <img src={defaultCover} alt="" className={s.deckCover} />
          ) : (
            <img src={packDeckCover} alt="" className={s.deckCover} />
          )}
        </div>
        <PacksInput
          id={'friendsPackInput'}
          text={'Search'}
          type={'text'}
          value={inputValue}
          width={'98%'}
          onChange={inputOnChaneHandler}
        />

        {isLoading && <LocalLoader />}

        {!isLoading && tableData.length === 0 && (
          <div className={s.friendsPack_noCardsWasFound}>NO PACKS WERE FOUND. TRY AGAIN ;)</div>
        )}
        {!isLoading && tableData.length !== 0 && (
          <div className={s.friendsPack_table}>
            <FriendsPackTable cardsData={tableData} />
          </div>
        )}

        {!isLoading && tableData.length !== 0 && (
          <div className={s.friendsPack_pagintion}>
            <SuperPagination
              page={page}
              itemsCountForPage={pageCount}
              totalCount={totalCount}
              onChange={onChangePagination}
            />
          </div>
        )}
      </div>
    </div>
  )
}
