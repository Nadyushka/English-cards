import React, { ChangeEvent, createRef } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { convertFileToBase64 } from '../../common/utils/image-loader-utils'
import { changeDataTC, logoutTC } from '../login/authReducer'

import { EditableSpan } from './editable-span/EditableSpan'
import s from './Profile.module.css'
import { getName } from './profileSelectors'

import { useAppDispatch, useAppSelector } from 'app/store'
import defaultAvatar from 'common/assets/pictures/defaultAvatar.jpg'
import avatarDownload from 'common/assets/pictures/dounloadPhoto.svg'
import { Error } from 'common/components/error/Error'
import { Loader } from 'common/components/loader/Loader'
import { PATH } from 'common/components/routes/RoutesComponent'
import { getEmailSelector, getIsAuthSelector } from 'features/login/selectors/loginSelectors'

export const Profile = () => {
  const isAuth = useSelector(getIsAuthSelector)
  const email = useSelector(getEmailSelector)
  const name = useSelector(getName)
  const loading = useAppSelector(state => state.app.loading)
  const errorMessage = useAppSelector(state => state.app.errorMessage)
  const avatarImg = useAppSelector(state => state.auth.avatar)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickHandler = () => {
    dispatch(logoutTC())
    navigate(PATH.LOGIN)
  }

  const onChangeHandler = (newValue: string) => {
    if (newValue) {
      dispatch(changeDataTC({ name: newValue }))
    }
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 1000000) {
        convertFileToBase64(file, fileName => dispatch(changeDataTC({ avatar: fileName })))
      }
    }
  }

  const addAvatarImg = createRef<HTMLInputElement>()

  if (!isAuth) {
    return <Navigate to={PATH.LOGIN} />
  }

  return loading ? (
    <Loader />
  ) : (
    <div className={s.profile_container}>
      <div className={s.backbutton_wrapper}>
        <button className={s.profile_backbutton} onClick={() => navigate(PATH.PACKS_ALL)}>
          Back to Packs List
        </button>
      </div>
      <div className={s.profile_wrapper}>
        <h2>Personal Information</h2>
        <div>
          <div className={s.profile_avatarImg}>
            <img
              src={avatarImg ? avatarImg : defaultAvatar}
              alt="avatar"
              className={s.profile_avatar}
            />
            <div
              className={s.profile_avatarDownload}
              onClick={() => addAvatarImg && addAvatarImg.current && addAvatarImg.current.click()}
            >
              <img src={avatarDownload} alt="avatar update" />
              <input
                type={'file'}
                style={{ display: 'none' }}
                ref={addAvatarImg}
                onChange={uploadHandler}
                accept={'image/png, image/gif, image/jpeg'}
              />
            </div>
          </div>
          <div className={s.profileName}>
            <EditableSpan value={name} onChange={onChangeHandler} />
          </div>
          <div className={s.profileEmail}>{email}</div>
          <button className={s.profileButton} onClick={onClickHandler}>
            Log out
          </button>
        </div>
        {errorMessage && <Error message={errorMessage} />}
      </div>
    </div>
  )
}
