import React, { ChangeEvent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import useDebouncedEffect from 'use-debounced-effect'

import s from './MyPack.module.css'

import { popUpHeaderToggleAC } from 'app/appReducer'
import {
  getErrorMessageSelector,
  getIsInitializeSelector,
  getLoadingSelector,
} from 'app/appSelectors'
import { useAppDispatch } from 'app/store'
import myPackMenu from 'common/assets/pictures/myPackMenu.svg'
import defaultCover from 'common/assets/pictures/noCoverImg-resized.jpeg'
import { Error } from 'common/components/error/Error'
import { Loader } from 'common/components/loader/Loader'
import { PATH } from 'common/components/routes/RoutesComponent'
import { getIsAuthSelector } from 'features/login/selectors/loginSelectors'
import { AddUpdateCardModal } from 'features/modals/addUpdateCardModal/AddUpdateCardModal'
import { addCardTC, getCardsTC } from 'features/packs/cardsReducer'
import { MyPackTable } from 'features/packs/p4-myPacks/myPackTable/myPackTable'
import { Popup } from 'features/packs/p4-myPacks/popup/Popup'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { PacksInput } from 'features/packs/p5-commonComponents/commonPackComponents/packsInput/PacksInput'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { SuperPagination } from 'features/packs/p5-commonComponents/commonPackComponents/pagination/SuperPagination'
import { LocalLoader } from 'features/packs/p5-commonComponents/usefullComponents/localLoader/LocalLoader'
import { getPacksTC, updatePackTC } from 'features/packs/packsReducer'
import {
  getCardsDataSelector,
  getMaxCardsCountSelector,
  getMinCardsCountSelector,
  getPackDeckCoverSelector,
  getPackNameSelector,
  getPackPageCountSelector,
  getPackPageSelector,
  getPackPrivateSelector,
  getPageTotalCountSelector,
} from 'features/packs/selectors/packsSelectors'

export const MyPack = () => {
  const isInitialize = useSelector(getIsInitializeSelector)
  const packName = useSelector(getPackNameSelector)
  const packDeckCover = useSelector(getPackDeckCoverSelector)
  const isPrivate = useSelector(getPackPrivateSelector)
  const cardsData = useSelector(getCardsDataSelector)
  const isAuth = useSelector(getIsAuthSelector)
  const isLoading = useSelector(getLoadingSelector)
  const errorMessage = useSelector(getErrorMessageSelector)
  const page = useSelector(getPackPageSelector)
  const pageCount = useSelector(getPackPageCountSelector)
  const totalCount = useSelector(getPageTotalCountSelector)
  const minCardsCountValue = useSelector(getMinCardsCountSelector)
  const maxCardsCountValue = useSelector(getMaxCardsCountSelector)

  const dispatch = useAppDispatch()
  let { packId } = useParams()

  const [myPacksInput, setMyPacksInput] = useState('')
  const [openPopup, setOpenPopup] = useState(false)

  dispatch(popUpHeaderToggleAC(false))

  useEffect(() => {
    packId && dispatch(getCardsTC({ cardsPack_id: packId }))
  }, [packId])

  const onChangeMyPacksInput = (e: ChangeEvent<HTMLInputElement>) =>
    setMyPacksInput(e.currentTarget.value)

  const addCardOnClickHandler = (
    cardQuestion: string,
    cardAnswer: string,
    questionImg?: string
  ) => {
    packId && dispatch(addCardTC(packId, cardQuestion, cardAnswer, questionImg))
  }

  const updatePack = (newPackName: string, isPrivate: boolean, newDeckCover: string) => {
    packId && dispatch(updatePackTC(packId, newPackName, isPrivate, newDeckCover))
    setOpenPopup(false)
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(
      getPacksTC({
        min: minCardsCountValue,
        max: maxCardsCountValue,
        page: newPage,
        pageCount: newCount,
        packName: myPacksInput,
      })
    )
  }

  useDebouncedEffect(
    () => {
      dispatch(getCardsTC({ cardsPack_id: packId, cardQuestion: myPacksInput }))
    },
    800,
    [myPacksInput]
  )
  if (!isInitialize) return <Loader />
  if (!isAuth) return <Navigate to={PATH.LOGIN} />

  return (
    <div className={s.myPacks}>
      <div className={s.myPacks_container}>
        <BackToPackLists />
        <div className={s.myPacks_titleAndButton}>
          <div className={s.myPacks_titleMenu}>
            <PacksTitle title={`My Pack:  ${packName}`} />
            <img
              src={myPackMenu}
              alt={'myPackMenu'}
              onClick={() => {
                setOpenPopup(!openPopup)
              }}
            />
            {openPopup && (
              <Popup
                packId={packId}
                packName={packName}
                isPrivate={isPrivate}
                deckCover={packDeckCover}
                updatePack={updatePack}
              />
            )}
          </div>

          <AddUpdateCardModal
            type={'add'}
            callBack={addCardOnClickHandler}
            cardQuestion={''}
            cardAnswer={''}
            questionFormatValue={'text'}
            questionImg={''}
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
          id={'myPacksInput'}
          text={'Search'}
          type={'text'}
          value={myPacksInput}
          width={'98%'}
          onChange={onChangeMyPacksInput}
        />

        {isLoading && <LocalLoader />}

        {!isLoading && cardsData.length !== 0 && (
          <div className={s.myPacks_table}>
            <MyPackTable cardsData={cardsData} cardsPack_id={packId!} />
          </div>
        )}

        {!isLoading && cardsData.length === 0 && myPacksInput.length !== 0 && (
          <div className={s.myPacks_noPacksWasFound}>
            NO PACKS WERE FOUND. REVISE YOUR FILTERS ;)
          </div>
        )}

        {!isLoading && cardsData.length === 0 && myPacksInput.length === 0 && (
          <Navigate to={`/emptyPack/${packId}/${packName}`} />
        )}

        {!isLoading && cardsData.length !== 0 && (
          <div className={s.myPacks_pagination}>
            <SuperPagination
              page={page}
              itemsCountForPage={pageCount}
              totalCount={totalCount}
              onChange={onChangePagination}
            />
          </div>
        )}
      </div>
      {errorMessage && <Error message={errorMessage} />}
    </div>
  )
}
