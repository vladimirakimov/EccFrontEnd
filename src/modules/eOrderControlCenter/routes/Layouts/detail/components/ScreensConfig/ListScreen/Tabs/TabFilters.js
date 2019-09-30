import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import GridHeader from '~/components/GridHeader'
import GridSelectCell from '~/components/GridSelectCell'
import { selectGridState, mapGridActions } from '~/utils/dxGridHelpers'
import { workOrderProperties } from '~/modules/eOrderControlCenter/redux/WorkOrderProperty/workOrderProperty.selector'
import { ACTIONS } from '../../../../redux/buttonPortFiltersList.actions'

const styles = () => ({
  informer: {
    padding: 16
  }
})

class TabFiltersTab extends React.PureComponent {
  constructor (props) {
    super(props)

    this.columns = [{
      name: 'property',
      caption: 'Work Order Item',
      editCell: (value, onChange) =>
        <GridSelectCell
          suggestions={this.props.workOrderProperties}
          field={'property'}
          value={value}
          onChange={onChange}
          placeholder={'Select work order item'}/>
    }, {
      name: 'value',
      caption: 'Value'
    }]
  }

  handleAdd = () => {
    const { changeAddedRows } = this.props
    changeAddedRows(Object.assign({}, [{ property: '', value: '' }]))
  }

  handleSave = newFilter => {
    if (!newFilter.property || !newFilter.value) return

    const {
      changeAddedRows,
      workOrderProperties,
      filters,
      onFilterAdd
    } = this.props

    const ids = filters.map(f => f.id)
    const id = filters.length ? Math.max.apply(null, ids) + 1 : 1
    newFilter.id = id

    const property = workOrderProperties.find(p => p.property === newFilter.property)

    const filter = {
      ...newFilter,
      type: property.type
    }

    changeAddedRows([])
    onFilterAdd(filter)
  }

  handleUpdate = updatedFilter => {
    const {
      changeEditingRowIds,
      onFiltersUpdate
    } = this.props

    changeEditingRowIds([])
    onFiltersUpdate(updatedFilter)
  }

  handleDelete = () => {
    const {
      selectedRows,
      changeSelection,
      onFiltersDelete
    } = this.props

    onFiltersDelete(selectedRows)
    changeSelection([])
  }

  render () {
    const {
      classes,
      addedRows,
      changeAddedRows,
      selectedRows,
      changeSelection,
      editingRowIds,
      changeEditingRowIds,
      changeRowChanges,
      rowChanges,
      filters
    } = this.props

    const showGrid = filters.length || Object.keys(addedRows).length > 0

    return (
      <div>
        <GridHeader
          title={'Filters list'}
          recordsCount={filters.length}
          numSelected={selectedRows.length}
          showAddButton
          onAdd={this.handleAdd}
          onDelete={this.handleDelete}/>

        {showGrid &&
          <Grid
            rows={filters}
            columns={this.columns}

            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            onSaveAddedRow={this.handleSave}

            editEnabled
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={changeEditingRowIds}
            onRowChangesChange={changeRowChanges}
            onSaveEditedRow={this.handleUpdate}
            rowChanges={rowChanges}

            selectionEnabled
            onSelectedRowIdsChange={changeSelection}
            selectedRowIds={selectedRows}

            actionsOnHover
            hover/>
        }

        {!showGrid && <Typography className={classes.informer}>Click Add button to create new filter</Typography>}
      </div>
    )
  }
}

TabFiltersTab.propTypes = {
  classes: PropTypes.object,

  addedRows: PropTypes.any,
  changeAddedRows: PropTypes.func,

  selectedRows: PropTypes.array,
  changeSelection: PropTypes.func,

  editingRowIds: PropTypes.array,
  changeEditingRowIds: PropTypes.func,
  changeRowChanges: PropTypes.func,
  rowChanges: PropTypes.any,

  workOrderProperties: PropTypes.array,

  filters: PropTypes.array,
  onFilterAdd: PropTypes.func,
  onFiltersUpdate: PropTypes.func,
  onFiltersDelete: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  ...selectGridState(state.pages.layouts.layoutButtonFiltersList),
  filters: ownProps.filters,
  workOrderProperties: workOrderProperties(state)
})

const mapDispatchToProps = (dispatch) => ({
  ...mapGridActions(dispatch, ACTIONS)
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TabFiltersTab))
