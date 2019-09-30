import { takeEvery, put, call, select } from 'redux-saga/effects'
import Yup, { mixed } from 'yup'

import { TYPES, ACTIONS as LIST_ACTIONS } from './sourceList.actions'
import { ACTIONS as DATA_ACTIONS } from '../../../redux/Source/source.actions'
import { getBusinessUnits } from '../../../redux/BusinessUnit/businessUnit.selector'
import { getSources } from '../../../redux/Source/source.selector'

const getValidationSchema = state => Yup.object().shape({
  name: Yup.string().required('Please fill in a valid name'),
  description: Yup.string().required('Please fill in a valid description'),
  businessUnits: Yup.lazy(() => {
    return mixed().oneOf([...getBusinessUnits(state).map(x => x.name)])
  })
})

const getOriginalRows = (state, changes) => getSources(state).filter(source => changes[source.id])
const getOriginalRow = (state, key) => getSources(state).filter(source => source.id === key)[0]
const getDeletingRowIds = state => state.pages.sources.deletingRowIds
const getRowId = row => row.id

function * validateRow (row) {
  const validationSchema = yield select(getValidationSchema)
  return yield call(() => validationSchema.validate(row, { abortEarly: false }))
}

function * sourceListSaga () {
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
    console.log(row)
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

export default sourceListSaga
