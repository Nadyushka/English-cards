import React from 'react'

import deletePack from 'common/assets/pictures/deletePack.svg'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import { BasicModal } from 'features/modals/BasicModal'
import { Title } from 'features/modals/commonComponents/title/Title'
import s from 'features/modals/deleteModal/DeleteModal.module.css'
import s2 from 'features/packs/p1-allPacks/actions/ActionsWithPacks.module.css'

type DeleteModalPropsType = {
  type: 'pack' | 'card'
  title: string
  deleteCallBack: () => void
}
const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const deleteButtonStyle = {
  backgroundColor: '#d32f2f',
}

export const DeleteModal = ({ type, title, deleteCallBack }: DeleteModalPropsType) => {
  return (
    <BasicModal
      childrenButton={handleOpen => (
        <img
          src={deletePack}
          alt={'icon'}
          onClick={() => handleOpen()}
          className={s2.actionsWithPacks_active}
        />
      )}
    >
      {handleClose => (
        <>
          <Title
            condition={type === 'pack'}
            firstTitle={'Delete Pack'}
            secondTitle={'Delete Card'}
          />

          <div className={s.contentBox}>
            <span>
              Do you really want to remove <b>{title}</b>?
              <br />
              {type === 'pack' && 'All cards will be deleted.'}
            </span>

            <div className={s.buttonBox}>
              <ButtonComponent
                name={'Cancel'}
                callBack={() => handleClose()}
                style={cancelButtonStyle}
              />
              <ButtonComponent
                name={'Delete'}
                callBack={() => {
                  deleteCallBack()
                  handleClose()
                }}
                style={deleteButtonStyle}
              />
            </div>
          </div>
        </>
      )}
    </BasicModal>
  )
}
