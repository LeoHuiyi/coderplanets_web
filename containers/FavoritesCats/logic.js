import R from 'ramda'

import { PAGE_SIZE } from '../../config'
import { makeDebugger, $solver, asyncRes, asyncErr, ERR } from '../../utils'
import SR71 from '../../utils/network/sr71'

import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:FavoritesCats')
/* eslint-enable no-unused-vars */

let store = null

export const categoryOnChange = R.curry((part, e) =>
  store.updateEditing({ [part]: e.target.value })
)

export function onCategoryCreate() {
  if (!store.validator('publish')) return false
  sr71$.mutate(S.createFavoriteCategory, { ...store.editCategoryData })
}

export function onCategoryUpdate() {
  if (!store.validator('publish')) return false
  sr71$.mutate(S.updateFavoriteCategory, { ...store.editCategoryData })
}

export const loadCategories = (page = 1) => {
  const userId = store.viewingUser.id

  sr71$.query(S.listFavoriteCategories, {
    userId,
    filter: { page, size: PAGE_SIZE.M },
  })
}

export function openUpdater(editCategory) {
  store.markState({
    showModal: true,
    showUpdater: true,
    showCreator: false,
    showSetter: false,
    curView: 'list',
    editCategory,
  })
}

export function openCreator() {
  store.markState({
    showModal: true,
    showUpdater: false,
    showCreator: true,
    showSetter: false,
    curView: 'list',
  })
}

export const onModalClose = () => {
  store.markState({ showModal: false })
  store.cleanEditData()
}

const reloadCats = () => {
  onModalClose()
  loadCategories()
}
// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('listFavoriteCategories'),
    action: ({ listFavoriteCategories: pagedCategories }) => {
      debug('listFavoriteCateories: ', pagedCategories)

      // const curView = pagedUsers.totalCount === 0 ? TYPE.RESULT_EMPTY : TYPE.RESULT
      store.markState({ pagedCategories })
      // store.closePreview()
      // dispatchEvent(EVENT.REFRESH_VIDEOS)
    },
  },
  {
    match: asyncRes('createFavoriteCategory'),
    action: () => reloadCats(),
  },
  {
    match: asyncRes('updateFavoriteCategory'),
    action: () => reloadCats(),
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      store.changesetErr({ title: '已经存在了', msg: details[0].detail })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      debug('ERR.TIMEOUT -->', details)
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
    },
  },
]

export function init(_store) {
  if (store) {
    return loadCategories()
  }
  store = _store

  debug(store)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  loadCategories()
}
