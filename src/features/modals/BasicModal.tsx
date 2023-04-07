import * as React from 'react'
import { FC, ReactNode, useState } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

type BasicModalPropsType = {
  childrenButton: (handleOpen: () => void) => ReactNode
  children: (handleClose: () => void) => ReactNode
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
}

export const BasicModal: FC<BasicModalPropsType> = ({ children, childrenButton }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {childrenButton(handleOpen)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children(handleClose)}</Box>
      </Modal>
    </>
  )
}
