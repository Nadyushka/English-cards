import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useSelector } from 'react-redux'

import { getCardsSortDownTC, getCardsSortUpTC } from '../../cardsReducer'

import { useAppDispatch } from 'app/store'
import { ActionsWithCards } from 'features/packs/p4-myPacks/actionsWithCards/ActionsWithCards'
import StarIcon from 'features/packs/p5-commonComponents/usefullComponents/StarIcon/StarIcon'
import {
  getPackPageCountSelector,
  getPackPageSelector,
  getSorDirectionCardsSelector,
} from 'features/packs/selectors/packsSelectors'

type PropsType = {
  cardsData: cardData[]
  cardsPack_id: string
}

export const MyPackTable = ({ cardsData, cardsPack_id }: PropsType) => {
  const sortDirection = useSelector(getSorDirectionCardsSelector)

  const dispatch = useAppDispatch()

  const columnsData = ['Question', 'Answer', 'Last updated', 'Grade', '']

  const setSortDirectionHandler = () => {
    sortDirection === 'up'
      ? dispatch(
          getCardsSortDownTC({
            cardsPack_id,
          })
        )
      : dispatch(
          getCardsSortUpTC({
            cardsPack_id,
          })
        )
  }

  const createData = (
    question: string,
    questionImg: string,
    answer: string,
    lastUpdated: string,
    grade: number,
    id: string,
    cardId: string
  ) => {
    return { question, questionImg, answer, lastUpdated, grade, id, cardId }
  }

  let rows = cardsData.map(pack =>
    createData(
      pack.question,
      pack.questionImg,
      pack.answer,
      pack.updated,
      pack.grade,
      pack.cardsPack_id,
      pack._id
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
            <TableRow key={row.cardId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                {row.questionImg ? (
                  <img src={row.questionImg} alt="questionImg" style={{ width: '70px' }} />
                ) : (
                  row.question
                )}
              </TableCell>
              <TableCell align="center">{row.answer}</TableCell>
              <TableCell align="center">
                {new Date(row.lastUpdated).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell align="center">
                <StarIcon grade={row.grade} />
              </TableCell>
              <TableCell align="center">
                <ActionsWithCards
                  cardId={row.cardId}
                  question={row.question}
                  answer={row.answer}
                  questionImg={row.questionImg}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

type cardData = {
  answer: string
  question: string
  questionImg: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
