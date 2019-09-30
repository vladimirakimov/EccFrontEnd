import { actionCreator } from 'redux-action-creator'

export const dxGridActionTypes = [
  'CHANGE_COLUMN_ORDER',
  'CHANGE_SORTING',
  'CHANGE_ROW_CHANGES',
  'CHANGE_ADDED_ROWS',
  'CHANGE_EDITING_ROWIDS',
  'SET_DELETING_ROWIDS',
  'SET_VALIDATION_ERRORS',
  'COMMIT_CHANGES',
  'CONFIRM_DELETE',
  'CHANGE_COLUMN_VISIBILITY',
  'CHANGE_COLUMN_WIDTHS',
  'CHANGE_FILTERS',
  'CHANGE_SELECTION',
  'CHANGE_GROUPING'
]

export function createDxGridActionCreators (types) {
  return {
    changeColumnOrder: actionCreator(types.CHANGE_COLUMN_ORDER, 'columnOrder'),
    changeSorting: actionCreator(types.CHANGE_SORTING, 'sorting'),
    changeRowChanges: actionCreator(types.CHANGE_ROW_CHANGES, 'rowChanges'),
    changeAddedRows: actionCreator(types.CHANGE_ADDED_ROWS, 'addedRows'),
    changeEditingRowIds: actionCreator(types.CHANGE_EDITING_ROWIDS, 'editingRowIds'),
    setDeletingRowIds: actionCreator(types.SET_DELETING_ROWIDS, 'deletingRowIds'),
    setValidationErrors: actionCreator(types.SET_VALIDATION_ERRORS, 'errors'),
    commitChanges: actionCreator(types.COMMIT_CHANGES, 'data'),
    confirmDelete: actionCreator(types.CONFIRM_DELETE),
    changeColumnVisibility: actionCreator(types.CHANGE_COLUMN_VISIBILITY, 'hiddenColumns'),
    changeColumnWidths: actionCreator(types.CHANGE_COLUMN_WIDTHS, 'columnWidths'),
    changeFilters: actionCreator(types.CHANGE_FILTERS, 'filters'),
    changeSelection: actionCreator(types.CHANGE_SELECTION, 'selectedRows'),
    changeGrouping: actionCreator(types.CHANGE_GROUPING, 'grouping')
  }
}

export const dxGridInitialState = {
  columnOrder: [],
  sorting: [],
  rowChanges: {},
  addedRows: {},
  editingRowIds: [],
  deletingRowIds: [],
  errors: {},
  hiddenColumns: [],
  columnWidths: [],
  filters: [],
  selectedRows: [],
  grouping: []
}

function isDxGridAction (types, action) {
  const dxGridActions = [
    types.CHANGE_COLUMN_ORDER,
    types.CHANGE_SORTING,
    types.CHANGE_ROW_CHANGES,
    types.CHANGE_ADDED_ROWS,
    types.CHANGE_EDITING_ROWIDS,
    types.SET_DELETING_ROWIDS,
    types.SET_VALIDATION_ERRORS,
    types.COMMIT_CHANGES,
    types.CONFIRM_DELETE,
    types.CHANGE_COLUMN_VISIBILITY,
    types.CHANGE_COLUMN_WIDTHS,
    types.CHANGE_FILTERS,
    types.CHANGE_SELECTION,
    types.CHANGE_GROUPING
  ]

  return dxGridActions.indexOf(action.type) !== -1
}

export function reduceDxGridActions (types, action, state, defaultRow) {
  if (!isDxGridAction(types, action)) {
    return state
  }

  switch (action.type) {
    case types.CHANGE_COLUMN_ORDER: {
      return { ...state, columnOrder: action.payload.columnOrder }
    }

    case types.CHANGE_SORTING: {
      return { ...state, sorting: action.payload.sorting }
    }

    case types.CHANGE_ROW_CHANGES: {
      return { ...state, rowChanges: action.payload.rowChanges }
    }

    case types.CHANGE_ADDED_ROWS: {
      return {
        ...state,
        addedRows: action.payload.addedRows,
        errors: action.payload.addedRows.length > 0 ? state.errors : {}
      }
    }

    case types.CHANGE_EDITING_ROWIDS: {
      return {
        ...state,
        editingRowIds: action.payload.editingRowIds.filter(rowId => !state.editingRowIds.includes(rowId)),
        errors: action.payload.editingRowIds.length > 0 ? state.errors : {}
      }
    }

    case types.SET_DELETING_ROWIDS: {
      return { ...state, deletingRowIds: action.payload.deletingRowIds || state.deletingRowIds }
    }

    case types.SET_VALIDATION_ERRORS: {
      return { ...state, errors: action.payload.errors }
    }

    case types.CHANGE_COLUMN_VISIBILITY: {
      return { ...state, hiddenColumns: action.payload.hiddenColumns }
    }

    case types.CHANGE_COLUMN_WIDTHS: {
      return { ...state, columnWidths: action.payload.columnWidths }
    }

    case types.CHANGE_FILTERS: {
      return { ...state, filters: action.payload.filters }
    }

    case types.CHANGE_SELECTION: {
      return { ...state, selectedRows: action.payload.selectedRows }
    }

    default:
      return state
  }
}

export const selectGridState = state => ({
  columnOrder: state.columnOrder,
  sorting: state.sorting,
  rowChanges: state.rowChanges,
  addedRows: state.addedRows,
  editingRowIds: state.editingRowIds,
  deletingRowIds: state.deletingRowIds,
  errors: state.errors,
  hiddenColumns: state.hiddenColumns,
  columnWidths: state.columnWidths,
  filters: state.filters,
  selectedRows: state.selectedRows
})

export const mapGridActions = (dispatch, actions) => ({
  changeColumnOrder: columnOrder => {
    dispatch(actions.changeColumnOrder(columnOrder))
  },
  changeSorting: sorting => {
    dispatch(actions.changeSorting(sorting))
  },
  changeRowChanges: rowChanges => {
    dispatch(actions.changeRowChanges(rowChanges))
  },
  changeAddedRows: addedRows => {
    dispatch(actions.changeAddedRows(addedRows))
  },
  changeEditingRowIds: editingRowIds => {
    dispatch(actions.changeEditingRowIds(editingRowIds))
  },
  setValidationErrors: errors => {
    dispatch(actions.setValidationErrors(errors))
  },
  cancelDelete: () => {
    dispatch(actions.setDeletingRowIds([]))
  },
  commitChanges: data => {
    dispatch(actions.commitChanges(data))
  },
  confirmDelete: () => {
    dispatch(actions.confirmDelete())
  },
  changeColumnVisibility: hiddenColumns => {
    dispatch(actions.changeColumnVisibility(hiddenColumns))
  },
  changeColumnWidths: columnWidths => {
    dispatch(actions.changeColumnWidths(columnWidths))
  },
  changeFilters: filters => {
    dispatch(actions.changeFilters(filters))
  },
  changeSelection: selectedRows => {
    dispatch(actions.changeSelection(selectedRows))
  }
})
