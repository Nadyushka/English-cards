import React, { useEffect } from 'react'

import './App.css'
import LinearProgress from '@mui/material/LinearProgress'
import { useSelector } from 'react-redux'

import { useAppDispatch } from './store'

import { initializeAppTC } from 'app/appReducer'
import { getIsInitializeSelector, getLinearLoadingSelector } from 'app/appSelectors'
import { Loader } from 'common/components/loader/Loader'
import { RoutesComponent } from 'common/components/routes/RoutesComponent'
import { Header } from 'features/header/Header'

export function App() {
  const isInitialize = useSelector(getIsInitializeSelector)
  const linearLoading = useSelector(getLinearLoadingSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])

  if (!isInitialize) return <Loader />

  return (
    <div className="App">
      <Header />
      {linearLoading && <LinearProgress />}
      <RoutesComponent />
    </div>
  )
}
