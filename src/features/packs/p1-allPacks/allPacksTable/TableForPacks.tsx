import React, { useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import s from '../AllPacks.module.css'

import { useAppDispatch } from 'app/store'
import defaultCover from 'common/assets/pictures/noCoverImg-resized.jpeg'
import { getUserIdSelector } from 'features/login/selectors/loginSelectors'
import { ActionsWithPacks } from 'features/packs/p1-allPacks/actions/ActionsWithPacks'
import { getSortDownPacksTC, getSortUpPacksTC } from 'features/packs/packsReducer'
import {
  getButtonDisableSelector,
  getPackPageCountSelector,
  getPackPageSelector,
  getSorDirectionSelector,
} from 'features/packs/selectors/packsSelectors'

// types

type packsData = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  private: boolean
  deckCover: string
}

type TableForPacksPropsType = {
  packsData: packsData[]
  minMaxCardsValue: number[]
  isMyPacks: boolean
}

export const TableForPacks = ({
  packsData,
  minMaxCardsValue,
  isMyPacks,
}: TableForPacksPropsType) => {
  const sortDirection = useSelector(getSorDirectionSelector)
  const userId = useSelector(getUserIdSelector)
  const page = useSelector(getPackPageSelector)
  const pageCount = useSelector(getPackPageCountSelector)
  const ButtonDisable = useSelector(getButtonDisableSelector)

  const dispatch = useAppDispatch()

  const columnsData = ['Cover', 'Name', 'Cards', 'Last updated', 'Created By', 'Actions']

  const setSortDirectionHandler = () => {
    if (isMyPacks) {
      sortDirection === 'up'
        ? dispatch(
            getSortDownPacksTC({
              sortPacks: '0updated',
              min: minMaxCardsValue[0],
              max: minMaxCardsValue[1],
              page,
              pageCount,
              user_id: userId,
            })
          )
        : dispatch(
            getSortUpPacksTC({
              sortPacks: '1updated',
              min: minMaxCardsValue[0],
              max: minMaxCardsValue[1],
              page,
              pageCount,
              user_id: userId,
            })
          )
    } else {
      sortDirection === 'up'
        ? dispatch(
            getSortDownPacksTC({
              sortPacks: '0updated',
              min: minMaxCardsValue[0],
              max: minMaxCardsValue[1],
              page,
              pageCount,
            })
          )
        : dispatch(
            getSortUpPacksTC({
              sortPacks: '1updated',
              min: minMaxCardsValue[0],
              max: minMaxCardsValue[1],
              page,
              pageCount,
            })
          )
    }
  }

  const createData = (
    name: string,
    cardsCount: number,
    lastUpdated: string,
    createdBy: string,
    userId: string,
    packId: string,
    isPrivate: boolean,
    deckCover: string
  ) => {
    return { name, cardsCount, lastUpdated, createdBy, userId, packId, isPrivate, deckCover }
  }

  let rows = packsData.map(pack =>
    createData(
      pack.name,
      pack.cardsCount,
      pack.created,
      pack.updated,
      pack.user_id,
      pack._id,
      pack.private,
      pack.deckCover
    )
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', paddingLeft: '36px' }} aria-label="simple table">
        <TableHead sx={{ background: '#EFEFEF' }}>
          <TableRow>
            {columnsData.map((columnData, index) => (
              <TableCell sx={{ fontWeight: '700', cursor: 'pointer' }} align="center" key={index}>
                <TableSortLabel
                  active={columnData === 'Last updated'}
                  direction={sortDirection === 'up' ? 'desc' : 'asc'}
                  sx={
                    columnData === 'Last updated'
                      ? { visibility: 'visible' }
                      : { visibility: 'hidden' }
                  }
                  onClick={() => {
                    setSortDirectionHandler()
                  }}
                />
                {columnData}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.createdBy}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ maxWidth: '80px', overflow: 'hidden' }} align="center">
                {row.deckCover ? (
                  <img src={row.deckCover} alt="cover" style={{ height: '50px', width: '50px' }} />
                ) : (
                  <img style={{ height: '50px', width: '50px' }} src={defaultCover} alt="cover" />
                )}
              </TableCell>
              <TableCell
                sx={{ cursor: 'pointer', maxWidth: '80px', overflow: 'hidden' }}
                align="center"
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {row.userId === userId ? (
                  row.cardsCount === 0 ? (
                    <NavLink
                      className={s.allPacks_link}
                      to={`/emptyPack/${row.packId}/${row.name}`}
                    >
                      {row.name}
                    </NavLink>
                  ) : (
                    <NavLink className={s.allPacks_link} to={`/myPack/${row.packId}/${row.name}`}>
                      {row.name}
                    </NavLink>
                  )
                ) : row.cardsCount === 0 ? (
                  <span style={{ opacity: 0.5 }}>{row.name}</span>
                ) : (
                  <NavLink
                    className={s.allPacks_link}
                    to={`/friendsPack/${row.packId}/${row.name}`}
                  >
                    {row.name}
                  </NavLink>
                )}
              </TableCell>
              <TableCell sx={{ maxWidth: '80px', overflow: 'hidden' }} align="center">
                {row.cardsCount}
              </TableCell>
              <TableCell sx={{ maxWidth: '145px', overflow: 'hidden' }} align="center">
                {new Date(row.createdBy).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell sx={{ maxWidth: '145px', overflow: 'hidden' }} align="center">
                {new Date(row.lastUpdated).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell align="center">
                <ActionsWithPacks
                  isVisible={row.userId === userId}
                  packId={row.packId}
                  userId={userId}
                  packName={row.name}
                  isPrivate={row.isPrivate}
                  cardsNumber={row.cardsCount}
                  deckCover={row.deckCover}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
