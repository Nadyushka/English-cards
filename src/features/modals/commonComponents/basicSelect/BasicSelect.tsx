import * as React from 'react'
import { useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { QuestionFormatType } from 'features/modals/addUpdateCardModal/AddUpdateCardModal'

type PropsType = {
  questionFormat: QuestionFormatType
  setQuestionFormat: (questionFormat: QuestionFormatType) => void
}

export const BasicSelect = ({ questionFormat, setQuestionFormat }: PropsType) => {
  const handleChange = (event: SelectChangeEvent) => {
    setQuestionFormat(event.target.value as QuestionFormatType)
  }

  return (
    <Box sx={{ minWidth: 120, margin: '20px 20px 0' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Question format</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={questionFormat}
          label="questionFormat"
          onChange={handleChange}
        >
          <MenuItem value={'text'}>Text</MenuItem>
          <MenuItem value={'picture'}>Picture</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
