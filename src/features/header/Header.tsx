import React from 'react'

import { useNavigate } from 'react-router-dom'

import { logoutTC } from '../login/authReducer'

import styles from './Header.module.css'

import { popUpHeaderToggleAC } from 'app/appReducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import backToProfile from 'common/assets/pictures/backToProfile.svg'
import defaultAvatar from 'common/assets/pictures/defaultAvatar.jpg'
import logo from 'common/assets/pictures/it-incubator-logo.svg'
import logout from 'common/assets/pictures/logout.svg'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import { PATH } from 'common/components/routes/RoutesComponent'

export const Header = () => {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const profileImg = useAppSelector(state => state.auth.avatar)
  const userName = useAppSelector(state => state.auth.name)
  const popUpHeader = useAppSelector(state => state.app.popUpHeaderOpen)

  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" />
      {isAuth && (
        <div>
          <div
            className={styles.headerAvatar}
            onClick={() => dispatch(popUpHeaderToggleAC(popUpHeader === true ? false : true))}
          >
            <span className={styles.userName}>{userName}</span>
            <img className={styles.header_avatar} src={profileImg ? profileImg : defaultAvatar} />
          </div>
        </div>
      )}

      {isAuth && popUpHeader && (
        <div className={styles.popUp}>
          <div
            className={styles.header_profile}
            onClick={() => {
              dispatch(popUpHeaderToggleAC(!popUpHeader))
              navigate(PATH.PROFILE)
            }}
          >
            <img src={backToProfile} />
            <span>Profile</span>
          </div>
          <div
            className={styles.header_logout}
            onClick={() => {
              dispatch(popUpHeaderToggleAC(!popUpHeader))
              dispatch(logoutTC())
              navigate(PATH.LOGIN)
            }}
          >
            <img src={logout} />
            <span>Log out</span>
          </div>
        </div>
      )}

      {!isAuth && (
        <ButtonComponent
          name={'Sign In'}
          callBack={() => {
            navigate(PATH.LOGIN)
          }}
        />
      )}
    </div>
  )
}
