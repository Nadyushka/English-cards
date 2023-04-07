import { AppRootStateType } from 'app/store'

//packs
export const getPacksSelector = (state: AppRootStateType) => state.packs.cardPacks
export const getPackPageSelector = (state: AppRootStateType) => state.packs.page
export const getPackPageCountSelector = (state: AppRootStateType) => state.packs.pageCount
export const getPageTotalCountSelector = (state: AppRootStateType) =>
  state.packs.cardPacksTotalCount
export const getMinCardsCountSelector = (state: AppRootStateType) => state.packs.minCardsCount
export const getMaxCardsCountSelector = (state: AppRootStateType) => state.packs.maxCardsCount
export const getSorDirectionSelector = (state: AppRootStateType) => state.packs.sortDirection
export const getButtonDisableSelector = (state: AppRootStateType) =>
  state.packs.buttonDisableBecauseProcess

//cards
export const getPackNameSelector = (state: AppRootStateType) => state.cards.packName
export const getPackDeckCoverSelector = (state: AppRootStateType) => state.cards.packDeckCover
export const getPackPrivateSelector = (state: AppRootStateType) => state.cards.packPrivate
export const getCardsCountSelector = (state: AppRootStateType) => state.cards.cardsTotalCount
export const getCardsDataSelector = (state: AppRootStateType) => state.cards.cards
export const getCardPageSelector = (state: AppRootStateType) => state.cards.page
export const getCardPageCountSelector = (state: AppRootStateType) => state.cards.pageCount
export const getCardTotalCountSelector = (state: AppRootStateType) => state.cards.cardsTotalCount
export const getSorDirectionCardsSelector = (state: AppRootStateType) => state.cards.sortDirection
