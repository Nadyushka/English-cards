import axios from 'axios'

import { PackType } from 'features/packs/packsReducer'

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:7542/2.0/'
  //     : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

//packsAPI
export const packsAPI = {
  getPacks(info: getPacksDataType = {}) {
    let params = { packName: '', page: 1, min: 0, max: 110, pageCount: 10, ...info }

    return instance.get<ResponseTypePacks>('/cards/pack', { params }).then(res => res.data)
  },
  getSortUpPacks(info: getPacksDataType = {}) {
    let params = { sortPacks: '0updated', page: 1, pageCount: 10, ...info }

    return instance.get<ResponseTypePacks>('/cards/pack', { params }).then(res => res.data)
  },
  getSortDownPacks(info: getPacksDataType = {}) {
    let params = { sortPacks: '1updated', page: 1, pageCount: 10, ...info }

    return instance.get<ResponseTypePacks>('/cards/pack', { params }).then(res => res.data)
  },
  addPack(newPack: { cardsPack: { name: string; private: boolean; deckCover: string } }) {
    return instance.post('/cards/pack', newPack)
  },
  deletePack(packId: string) {
    return instance.delete(`/cards/pack?id=${packId}`)
  },
  updatePack(updatedPack: { cardsPack: { _id: string; name: string } }) {
    return instance.put<{ updatedCardsPack: PackType }>('/cards/pack', updatedPack)
  },
  getCards(info: getCardsDataType = {}) {
    let params = { page: 1, pageCount: 10, ...info }

    return instance.get<ResponseTypeCards>('/cards/card', { params }).then(res => res.data)
  },
  getSortUpCards(info: getCardsDataType = {}) {
    let data = { sortCards: '0updated', page: 1, pageCount: 10, ...info }

    return instance.get<ResponseTypeCards>('/cards/card', { params: data }).then(res => res.data)
  },
  getSortDownCards(info: getCardsDataType = {}) {
    let data = { sortCards: '1updated', page: 1, pageCount: 10, ...info }

    return instance.get<ResponseTypeCards>('/cards/card', { params: data }).then(res => res.data)
  },
  addCard(newCard: { card: { cardsPack_id: string } }) {
    return instance.post('/cards/card', newCard)
  },
  deleteCard(cardId: string) {
    return instance.delete(`/cards/card?id=${cardId}`)
  },
  updateCard(newCard: { card: { _id: string; question: string } }) {
    return instance.put(`/cards/card`, newCard)
  },
  learnCard(grade: number, card_id: string) {
    return instance.put<ResponseTypeCardLearn>(`/cards/grade`, { grade, card_id })
  },
}

export type ResponseTypePacks = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type ResponseTypeCards = {
  cards?: CardType[]
  cardsTotalCount?: number
  packName?: string
  packPrivate?: boolean
  packDeckCover?: string
  packUserId?: string
  maxGrade?: number
  minGrade?: number
  page?: number
  pageCount?: number
  packCreated?: string
  packUpdated?: string
}

type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
  questionImg: string
}

export type getPacksDataType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: '0updated' | '1updated'
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

export type getCardsDataType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: '0grade' | '1grade'
  page?: number
  pageCount?: number
}

type ResponseTypeCardLearn = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
