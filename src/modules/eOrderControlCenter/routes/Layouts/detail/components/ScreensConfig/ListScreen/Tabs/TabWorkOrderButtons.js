import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import GridHeader from '~/components/GridHeader'
import GridSelectCell from '~/components/GridSelectCell'
import GridSwitchCell from '~/components/GridSwitchCell'
import GridSwitchCellDisplay from '~/components/GridSwitchCellDisplay'
import { selectGridState, mapGridActions } from '~/utils/dxGridHelpers'
import { workOrderProperties } from '~/modules/eOrderControlCenter/redux/WorkOrderProperty/workOrderProperty.selector'
import { ACTIONS } from '../../../../redux/tabWorkOrderButtonsList.actions'

const styles = theme => ({
  informer: {
    padding: 16
  },
  switchContainer: {
    margin: '0 16px',
    borderBottom: `1px solid ${theme.palette.default.border}`,
    padding: '16px 0'
  },
  label: {
    marginLeft: 0
  },
  centeredText: {
    textAlign: 'center'
  }
})

const sortOrderTypes = [{
  type: 'None',
  value: null
}, {
  type: 'Ascending',
  value: 'asc'
}, {
  type: 'Descending',
  value: 'desc'
}]

class TabWorkOrderButtonsTab extends React.PureComponent {
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
      name: 'highlight',
      caption: 'Highlight',
      headerCell: value => <TableCell className={this.props.classes.centeredText}>{value}</TableCell>,
      editCell: (value, onChange) => <GridSwitchCell value={value} onChange={onChange} />,
      displayCell: value => <GridSwitchCellDisplay value={value} />
    }, {
      name: 'showCaption',
      caption: 'Show caption',
      headerCell: value => <TableCell className={this.props.classes.centeredText}>{value}</TableCell>,
      editCell: (value, onChange) => <GridSwitchCell value={value} onChange={onChange} />,
      displayCell: value => <GridSwitchCellDisplay value={value} />
    }, {
      name: 'sortSequence',
      caption: 'Sort sequence',
      editCell: (value, onChange) =>
        <TableCell>
          <TextField
            id="standard-number"
            value={value}
            onChange={onChange}
            type="number"
            margin="normal"/>
        </TableCell>
    }, {
      name: 'sortOrder',
      caption: 'Sort order',
      editCell: (value, onChange) =>
        <GridSelectCell
          suggestions={sortOrderTypes}
          field={'type'}
          value={value}
          onChange={onChange}
          placeholder={'Select ordering type'}/>
    }, {
      name: 'hideOnButton',
      caption: 'Hide on button',
      headerCell: value => <TableCell className={this.props.classes.centeredText}>{value}</TableCell>,
      editCell: (value, onChange) => <GridSwitchCell value={value} onChange={onChange} />,
      displayCell: value => <GridSwitchCellDisplay value={value} />
    }]
  }

  handleAdd = () => {
    const { changeAddedRows } = this.props
    changeAddedRows(Object.assign({}, [{
      property: '',
      highlight: false,
      showCaption: false,
      sortSequence: '',
      sortOrder: '',
      hideOnButton: false
    }]))
  }

  handleSave = newButton => {
    if (!newButton.property) return

    const {
      changeAddedRows,
      workOrderProperties,
      buttons,
      onButtonAdd
    } = this.props

    const ids = buttons.map(f => f.id)
    const id = buttons.length ? Math.max.apply(null, ids) + 1 : 1
    newButton.id = id

    const property = workOrderProperties.find(p => p.property === newButton.property)
    const button = {
      ...newButton,
      type: property.type
    }

    changeAddedRows([])
    onButtonAdd(button)
  }

  handleUpdate = updatedButton => {
    const {
      changeEditingRowIds,
      onButtonUpdate
    } = this.props

    changeEditingRowIds([])
    onButtonUpdate(updatedButton)
  }

  handleDelete = () => {
    const {
      selectedRows,
      changeSelection,
      onButtonsDelete
    } = this.props

    onButtonsDelete(selectedRows)
    changeSelection([])
  }

  handleShowOperationIcon = () => {
    const { onShowOperationIconChange } = this.props
    onShowOperationIconChange()
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
      buttons,
      showOperationIcon
    } = this.props

    const showGrid = buttons.length || Object.keys(addedRows).length > 0

    return (
      <div>
        <div className={classes.switchContainer}>
          <FormControlLabel
            className={classes.label}
            control={
              <Switch
                checked={showOperationIcon}
                onChange={this.handleShowOperationIcon}
                value="showOperationIcon"
                color="primary" />}
            label="Show operation icon" />
        </div>

        <GridHeader
          title={'Button configuration'}
          recordsCount={buttons.length}
          numSelected={selectedRows.length}
          showAddButton
          onAdd={this.handleAdd}
          onDelete={this.handleDelete}/>

        {showGrid &&
          <Grid
            rows={buttons}
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

TabWorkOrderButtonsTab.propTypes = {
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

  showOperationIcon: PropTypes.bool,
  onShowOperationIconChange: PropTypes.func,

  buttons: PropTypes.array,
  onButtonAdd: PropTypes.func,
  onButtonUpdate: PropTypes.func,
  onButtonsDelete: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  ...selectGridState(state.pages.layouts.layoutTabWorkOrderButtonsList),
  buttons: ownProps.buttons,
  workOrderProperties: workOrderProperties(state)
})

const mapDispatchToProps = (dispatch) => ({
  ...mapGridActions(dispatch, ACTIONS)
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TabWorkOrderButtonsTab))
