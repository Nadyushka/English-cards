import React from 'react'

import { TableFooter } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useSelector } from 'react-redux'

import { getSortDownPacksTC, getSortUpPacksTC } from '../../packsReducer'

import { useAppDispatch } from 'app/store'
import StarIcon from 'features/packs/p5-commonComponents/usefullComponents/StarIcon/StarIcon'
import {
  getPackPageCountSelector,
  getPackPageSelector,
  getSorDirectionSelector,
} from 'features/packs/selectors/packsSelectors'

type PropsType = {
  cardsData: cardData[]
}

export const FriendsPackTable = ({ cardsData }: PropsType) => {
  const sortDirection = useSelector(getSorDirectionSelector)
  const page = useSelector(getPackPageSelector)
  const pageCount = useSelector(getPackPageCountSelector)

  const dispatch = useAppDispatch()

  const columnsData = ['Question', 'Answer', 'Last updated', 'Grade']

  const setSortDirectionHandler = () => {
    sortDirection === 'up'
      ? dispatch(
          getSortDownPacksTC({
            sortPacks: '0updated',
            page,
            pageCount,
          })
        )
      : dispatch(
          getSortUpPacksTC({
            sortPacks: '0updated',
            page,
            pageCount,
          })
        )
  }

  const createData = (
    question: string,
    answer: string,
    lastUpdated: string,
    grade: number,
    id: string
  ) => {
    return { question, answer, lastUpdated, grade, id }
  }

  let rows = cardsData.map(pack =>
    createData(pack.question, pack.answer, pack.updated, pack.grade, pack.cardsPack_id)
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', paddingLeft: '36px' }} aria-label="simple table">
        <TableHead sx={{ background: '#EFEFEF' }}>
          <TableRow>
            {columnsData.map((columnData, index) => (
              <TableCell
                sx={{ fontWeight: '700', cursor: 'pointer', maxWidth: '145px' }}
                align="center"
                key={index}
              >
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
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ maxWidth: '145px', overflow: 'hidden' }} align="center">
                {row.question}
              </TableCell>
              <TableCell sx={{ maxWidth: '145px', overflow: 'hidden' }} align="center">
                {row.answer}
              </TableCell>
              <TableCell sx={{ maxWidth: '140px', overflow: 'hidden' }} align="center">
                {new Date(row.lastUpdated).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell sx={{ maxWidth: '90px', overflow: 'hidden' }} align="center">
                <StarIcon grade={row.grade} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/*<Pagination count={elementsOnPage} page={currentPageNumber} onChange={onChangePagination}/>*/}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

type cardData = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
