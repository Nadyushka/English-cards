import React, { ChangeEvent, useState } from 'react'

import updatePack from 'common/assets/pictures/changePack.svg'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import s from 'features/modals/addUpdatePackModal/AddUpdatePackModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { CheckBoxComponent } from 'features/modals/commonComponents/checkbox/CheckBoxComponent'
import { InputComponent } from 'features/modals/commonComponents/input/InputComponent'
import { Title } from 'features/modals/commonComponents/title/Title'
import { UploadButton } from 'features/modals/commonComponents/uploadButton/uploadButton'
import s2 from 'features/packs/p1-allPacks/actions/ActionsWithPacks.module.css'

type AddPackModalPropsType = {
  type: 'add' | 'update'
  callBack: (packName: string, isPrivate: boolean, deckCover: string) => void
  packName: string
  isPrivate: boolean
  deckCover: string
}
const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const saveButtonStyle = {
  backgroundColor: '#366EFF',
}

export const AddUpdatePackModal = ({
  type,
  callBack,
  packName,
  isPrivate,
  deckCover,
}: AddPackModalPropsType) => {
  const [newPackName, setNewPackName] = useState(packName)
  const [privateField, setPrivateField] = useState(isPrivate)
  const [cover, setCover] = useState(deckCover)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateField(e.currentTarget.checked)
  }

  return (
    <BasicModal
      childrenButton={handleOpen =>
        type === 'update' ? (
          <img
            src={updatePack}
            alt={'icon'}
            onClick={() => handleOpen()}
            className={s2.actionsWithPacks_active}
          />
        ) : (
          <ButtonComponent name={'Add new pack'} callBack={() => handleOpen()} />
        )
      }
    >
      {handleClose => (
        <>
          <Title
            condition={type === 'update'}
            firstTitle={'Edit pack'}
            secondTitle={'Add new pack'}
          />

          <div className={s.contentBox}>
            <div className={s.inputUploadButton}>
              <InputComponent
                labelName={'Pack Name'}
                name={'packName'}
                value={newPackName}
                onChange={onChangeHandler}
                autoFocus={true}
              />
              <UploadButton setImage={setCover} />
            </div>

            <div className={s.coverBox}>
              {cover && <img src={cover} alt="cover" className={s.cover} />}
            </div>

            <CheckBoxComponent
              checked={privateField}
              name={'private'}
              type={'checkbox'}
              labelName={'Private pack'}
              id={'private'}
              onChange={changeCheckBoxHandler}
            />

            <div className={s.buttonBox}>
              <ButtonComponent
                name={'Cancel'}
                callBack={() => {
                  handleClose()
                  if (type === 'add') {
                    setNewPackName('')
                    setPrivateField(false)
                    setCover('')
                  }
                }}
                style={cancelButtonStyle}
              />

              <ButtonComponent
                name={'Save'}
                callBack={() => {
                  callBack(newPackName, privateField, cover)
                  handleClose()
                  setNewPackName('')
                  setPrivateField(false)
                  setCover('')
                }}
                style={saveButtonStyle}
                disabled={newPackName === ''}
              />
            </div>
          </div>
        </>
      )}
    </BasicModal>
  )
}
