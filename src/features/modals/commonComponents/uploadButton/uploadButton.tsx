import * as React from 'react'
import { ChangeEvent } from 'react'

import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import IconButton from '@mui/material/IconButton'

import s from './uploadButton.module.css'

import { setErrorAC } from 'app/appReducer'
import { useAppDispatch } from 'app/store'

type Props = {
  setImage: (cover: string) => void
}

export const UploadButton = ({ setImage }: Props) => {
  const dispatch = useAppDispatch()

  const convertFileToBase64 = (file: File, callBack: (file64: string) => void) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('File: ', file)
      if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
        if (file.size < 102400) {
          convertFileToBase64(file, file64 => {
            setImage(file64)
          })
        } else {
          dispatch(setErrorAC('Image is too big. Image size can not be more than 100kB'))
        }
      } else {
        dispatch(setErrorAC('Use only jpg/jpeg or png format'))
      }
    }
  }

  return (
    <div className={s.uploadButton}>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={uploadHandler} />
        <CloudDownloadIcon />
      </IconButton>
    </div>
  )
}
