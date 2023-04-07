import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './BackToPackLists.module.css'

import { popUpHeaderToggleAC } from 'app/appReducer'
import { useAppDispatch } from 'app/store'
import arrowBack from 'common/assets/pictures/arrowBack.svg'
import { PATH } from 'common/components/routes/RoutesComponent'
import { setCardDefaultsAC } from 'features/packs/cardsReducer'

type PropsType = {
  navigation?: string
  buttonName?: string
}

export const BackToPackLists = ({ navigation, buttonName }: PropsType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(popUpHeaderToggleAC(false))
    navigation ? navigate(navigation) : navigate(PATH.PACKS_ALL)
    dispatch(setCardDefaultsAC())
  }

  return (
    <div className={s.backToPackLists} onClick={onClickHandler}>
      <img src={arrowBack} alt={'arrow back'} />
      <span> {buttonName ? buttonName : ' Back to Packs List'}</span>
    </div>
  )
}
