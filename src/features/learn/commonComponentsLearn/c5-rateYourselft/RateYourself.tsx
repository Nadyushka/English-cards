import React from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import s from './RateYourself.module.css'

type PropsType = {
  value: string
  setValue: (value: string) => void
}

const RateYourself = ({ value, setValue }: PropsType) => {
  const radiosOnchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <div className={s.rateYourself}>
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{ color: '#000000', marginBottom: '12px' }}
        >
          Rate yourself:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="knew_the_answer"
          name="radio-buttons-group"
          value={value}
          onChange={radiosOnchangeHandler}
        >
          <FormControlLabel
            value="did_not_know"
            control={<Radio size="small" />}
            label="Did not know"
          />
          <FormControlLabel value="forgot" control={<Radio size="small" />} label="Forgot" />
          <FormControlLabel
            value="a_lot_of_thought"
            control={<Radio size="small" />}
            label="A lot of thought"
          />
          <FormControlLabel value="confused" control={<Radio size="small" />} label="Сonfused" />
          <FormControlLabel
            value="knew_the_answer"
            control={<Radio size="small" />}
            label="Knew the answer"
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default RateYourself
