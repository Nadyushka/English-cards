import React from 'react'

import s from './ShowPacksCards.module.css'

type PropsType = {
  onClick: () => void
  isMyPacks: boolean
}

export const ShowPacksCards = ({ onClick, isMyPacks }: PropsType) => {
  return (
    <div className={s.showPacksCards}>
      <h3>Show packs cards</h3>
      <div className={s.showPacksCards_wrapper}>
        <div
          onClick={onClick}
          className={isMyPacks ? s.showPacksCards_active : s.showPacksCards_inactive}
        >
          <span>My</span>
        </div>
        <div
          onClick={onClick}
          className={!isMyPacks ? s.showPacksCards_active : s.showPacksCards_inactive}
        >
          <span>All</span>
        </div>
      </div>
    </div>
  )
}
