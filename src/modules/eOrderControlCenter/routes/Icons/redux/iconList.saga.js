import React from 'react'
import { takeEvery, put, call, select } from 'redux-saga/effects'
import Yup from 'yup'

import { TYPES, ACTIONS as LIST_ACTIONS } from './iconList.actions'
import { ACTIONS as DATA_ACTIONS } from '../../../redux/Icon/icon.actions'
import { getIcons } from '../../../redux/Icon/icon.selector'
import { FormattedMessage } from 'react-intl'

const getValidationSchema = state => Yup.object().shape({
  name: Yup.string().required(<FormattedMessage id='icon.validation.name' />),
  dataPath: Yup.string().required(<FormattedMessage id='icon.validation.path' />)
})

const getOriginalRows = (state, changes) => getIcons(state).filter(icon => changes[icon.id])
const getOriginalRow = (state, key) => getIcons(state).filter(icon => icon.id === key)[0]
const getDeletingRowIds = state => state.pages.icons.deletingRowIds
const getRowId = row => row.id

function * validateRow (row) {
  const validationSchema = yield select(getValidationSchema)
  return yield call(() => validationSchema.validate(row, { abortEarly: false }))
}

function * iconListSaga () {
  yield takeEvery(TYPES.COMMIT_CHANGES, commitChanges)
  yield takeEvery(TYPES.CONFIRM_DELETE, confirmDelete)
}

function * commitChanges (action) {
  const { added, changed, deleted } = action.payload.data
  if (added) {
    yield addRow(added[0])
  }

  if (changed) {
    yield updateRow(changed)
  }

  if (deleted) {
    yield setDeletingRowIds(deleted)
  }
}

function * addRow (row) {
  try {
    yield validateRow(row)
    yield put(DATA_ACTIONS.create(row))
    yield put(LIST_ACTIONS.setValidationErrors({}))
  } catch (error) {
    console.log(error)
    yield put(LIST_ACTIONS.setValidationErrors(error))
    yield put(LIST_ACTIONS.changeAddedRows([row]))
  }
}

function * updateRow (changes) {
  const changedRows = yield select(getOriginalRows, changes)
  const originalRow = changedRows[0]
  try {
    const updatedRow = { ...originalRow, ...changes[getRowId(originalRow)] }
    yield validateRow(updatedRow)
    yield put(LIST_ACTIONS.setValidationErrors({}))
    yield put(DATA_ACTIONS.update(updatedRow))
  } catch (error) {
    yield put(LIST_ACTIONS.setValidationErrors(error))
    yield put(LIST_ACTIONS.changeRowChanges(changes))
    yield put(LIST_ACTIONS.changeEditingRowIds([getRowId(originalRow)]))
  }
}

function * setDeletingRowIds (rowIds) {
  yield put(LIST_ACTIONS.setDeletingRowIds(rowIds))
}

function * confirmDelete () {
  const deletingRowIds = yield select(getDeletingRowIds)
  for (var i = 0; i < deletingRowIds.length; i++) {
    const originalRow = yield select(getOriginalRow, deletingRowIds[i])
    yield put(DATA_ACTIONS.delete(originalRow))
  }
  yield put(LIST_ACTIONS.setDeletingRowIds([]))
}

export default iconListSaga
