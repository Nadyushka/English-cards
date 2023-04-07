import React from 'react'

import Box from '@mui/joy/Box'
import Slider from '@mui/joy/Slider'

import s from './NumberOfCards.module.css'

type PropsType = {
  value: number[]
  onChange: (event: Event, newValue: number | number[]) => void
}

export const NumberOfCards = ({ value, onChange }: PropsType) => {
  return (
    <div className={s.numberOfCards}>
      <h3>Number of cards</h3>
      <div className={s.numberOfCards_wrapper}>
        <div className={s.numberOfCards_minValue}>{value[0]}</div>
        <Box sx={{ width: 155 }}>
          <Slider
            getAriaLabel={() => 'Number of cards'}
            value={value}
            onChange={onChange}
            size={'md'}
          />
        </Box>
        <div className={s.numberOfCards_maxValue}>{value[1]}</div>
      </div>
    </div>
  )
}
