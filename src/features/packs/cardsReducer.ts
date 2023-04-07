import { getCardsDataType, getPacksDataType, packsAPI, ResponseTypeCards } from './packsAPI'

import { setLinearLoadingAC, setLoadingAC } from 'app/appReducer'
import { AppThunk } from 'app/store'
import { handleError } from 'common/utils/error-utils'
import { updatePackAC } from 'features/packs/packsReducer'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  maxGrade: 5,
  minGrade: 1,
  packName: '',
  packDeckCover: '',
  packPrivate: false,
  packUpdated: '',
  packUserId: '',
  page: 1,
  pageCount: 10,
  sortDirection: 'up',
}

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case 'cards/SET-CARDS':
      return { ...state, ...action.cardsInfo, cards: [...action.cardsInfo.cards!] }
    case 'packs/SET-CARDS-SORTED-UP':
      return {
        ...state,
        ...action.cardsInfo,
        cards: [...action.cardsInfo.cards!],
        sortDirection: 'up',
      }
    case 'packs/SET-CARDS-SORTED-DOWN':
      return {
        ...state,
        ...action.cardsInfo,
        cards: [...action.cardsInfo.cards!],
        sortDirection: 'down',
      }
    case 'cards/SET-DEFAULT-CARDS':
      return { ...state, cardsTotalCount: 0, packDeckCover: '' }
    case 'packs/SET-lEARN-TYPE-FILTER':
      return {
        ...state,
        cards: state.cards
          .map(card =>
            card._id === action.cardId
              ? {
                  ...card,
                  shots: card.shots + 1,
                  grade: action.grade,
                }
              : { ...card }
          )
          .filter(card => (card._id === action.cardId ? card.grade !== 5 : card.grade <= 5)),
      }
    case 'packs/UPDATE_PACK':
      return {
        ...state,
        packName: action.payload.newPackName,
        packPrivate: action.payload.isPrivate,
        packUpdated: action.payload.updated,
        packDeckCover: action.payload.deckCover,
      }
    default:
      return state
  }
}

// action creators

export const setCardsAC = (cardsInfo: ResponseTypeCards) =>
  ({ type: 'cards/SET-CARDS', cardsInfo } as const)
export const setCardDefaultsAC = () => ({ type: 'cards/SET-DEFAULT-CARDS' } as const)
export const setCardsSortUpdAC = (cardsInfo: ResponseTypeCards) =>
  ({
    type: 'packs/SET-CARDS-SORTED-UP',
    cardsInfo,
  } as const)
export const setCardsSortDownAC = (cardsInfo: ResponseTypeCards) =>
  ({
    type: 'packs/SET-CARDS-SORTED-DOWN',
    cardsInfo,
  } as const)
const toggleButtonDisableAC = (buttonDisable: boolean) =>
  ({ type: 'packs/SET-BUTTON-DISABLE', buttonDisable } as const)

const learnCardFilterAC = (grade: number, cardId: string) =>
  ({ type: 'packs/SET-lEARN-TYPE-FILTER', grade, cardId } as const)

// thunk creators

export const getCardsTC =
  (cardsInfo: getCardsDataType): AppThunk =>
  async dispatch => {
    dispatch(setLoadingAC(true))
    try {
      let cards: ResponseTypeCards = { packDeckCover: '' }
      let res = await packsAPI.getCards(cardsInfo)

      cards = { ...cards, ...res }
      console.log('cards: ', cards)
      dispatch(setCardsAC(cards))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLoadingAC(false))
    }
  }

export const getCardsSortUpTC =
  (data: getCardsDataType): AppThunk =>
  async dispatch => {
    try {
      let res = await packsAPI.getSortUpCards(data)

      dispatch(setCardsSortUpdAC(res))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const getCardsSortDownTC =
  (data: getCardsDataType): AppThunk =>
  async dispatch => {
    try {
      let res = await packsAPI.getSortDownCards(data)

      dispatch(setCardsSortDownAC(res))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const addCardTC =
  (
    cardsPack_id: string,
    cardQuestion: string,
    cardAnswer: string,
    questionImg?: string
  ): AppThunk =>
  async dispatch => {
    dispatch(setLinearLoadingAC(true))
    try {
      toggleButtonDisableAC(true)
      let newCard = {
        card: {
          cardsPack_id,
          question: cardQuestion,
          answer: cardAnswer,
          questionImg: questionImg || '',
        },
      }

      await packsAPI.addCard(newCard)
      let res = await packsAPI.getCards({ cardsPack_id })

      dispatch(setCardsAC(res))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLinearLoadingAC(false))
    }
  }

export const deleteCardTC =
  (cardsPack_id: string, cardId: string): AppThunk =>
  async dispatch => {
    dispatch(setLinearLoadingAC(true))
    try {
      await packsAPI.deleteCard(cardId)
      let res = await packsAPI.getCards({ cardsPack_id })

      dispatch(setCardsAC(res))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLinearLoadingAC(false))
    }
  }

export const updateCardTC =
  (
    cardsPack_id: string,
    cardId: string,
    cardQuestion: string,
    cardAnswer: string,
    questionImg: string
  ): AppThunk =>
  async dispatch => {
    dispatch(setLinearLoadingAC(true))
    try {
      let updatedCard = {
        card: {
          _id: cardId,
          question: cardQuestion,
          answer: cardAnswer,
          questionImg: questionImg,
        },
      }

      await packsAPI.updateCard(updatedCard)
      let res = await packsAPI.getCards({ cardsPack_id })

      dispatch(setCardsAC(res))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLinearLoadingAC(false))
    }
  }

export const learnCardTC =
  (grade: number, card_id: string): AppThunk =>
  async dispatch => {
    try {
      await packsAPI.learnCard(grade, card_id)
      dispatch(learnCardFilterAC(grade, card_id))
      dispatch(setLoadingAC(false))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

//types

export type CardsActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setCardsSortUpdAC>
  | ReturnType<typeof setCardsSortDownAC>
  | ReturnType<typeof setCardDefaultsAC>
  | ReturnType<typeof learnCardFilterAC>
  | ReturnType<typeof updatePackAC>

export type InitialStateType = typeof initialState

export type CardType = {
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
