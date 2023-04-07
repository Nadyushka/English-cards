import React from 'react'

import s from './LocalLoader.module.css'

export const LocalLoader = () => {
  return (
    <div className={s.localLoader_background}>
      <div className={s.localLoader} />
    </div>
  )
}
