import React from 'react'

import { Route, Routes } from 'react-router-dom'

import UpdatePassword from '../../../features/login/forgotPassword/f3-updatePassword/UpdatePassword'
import Registration from '../../../features/registration/Registration'

import { Learn } from 'features/learn/Learn'
import { ForgotPassword } from 'features/login/forgotPassword/f1-forgotPassword/ForgotPassword'
import SentEmail from 'features/login/forgotPassword/f2-sentEmail/SentEmail'
import { Login } from 'features/login/Login'
import { AllPacks } from 'features/packs/p1-allPacks/AllPacks'
import { EmptyPack } from 'features/packs/p2-emptyPack/EmptyPack'
import { FriendsPack } from 'features/packs/p3-friendsPacks/FriendsPack'
import { MyPack } from 'features/packs/p4-myPacks/MyPack'
import { Profile } from 'features/profile/Profile'

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  SET_PASSWORD: '/setPassword',
  UPDATE_PASSWORD: '/updatePassword',
  UPDATE_PASSWORD_INFO: '/updatePassword/info',
  SET_NEW_PASSWORD: '/set-new-password/:setNewPasswordToken?',
  ERROR_404: '/error404',
  PACKS_ALL: '/allPacks',
  PACKS_MY: '/myPack/:packId?/:packName?',
  NO_PACKS: '/emptyPack/:packId?/:packName?',
  PACK_FRIEND: '/friendsPack/:packId?/:packName?',
  LEARN: '/learn/:cardsPack_id?/:packName?/:packType?',
}

export const RoutesComponent = () => {
  return (
    <Routes>
      {/*add your routes here*/}
      <Route path={'/'} element={<AllPacks />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.UPDATE_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.UPDATE_PASSWORD_INFO} element={<SentEmail />} />
      <Route path={PATH.SET_NEW_PASSWORD} element={<UpdatePassword />} />
      <Route path={PATH.PACKS_ALL} element={<AllPacks />} />
      <Route path={PATH.PACKS_MY} element={<MyPack />} />
      <Route path={PATH.NO_PACKS} element={<EmptyPack />} />
      <Route path={PATH.PACK_FRIEND} element={<FriendsPack />} />
      <Route path={PATH.LEARN} element={<Learn />} />

      {/*<Route path={PATH.ERROR_404} element={<Page404 />} />*/}
      {/*<Route path="*" element={<Navigate to={PATH.ERROR_404} />} />*/}
    </Routes>
  )
}
