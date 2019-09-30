import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar/AppBar'
import ButtonAdd from '~/components/ButtonAdd'
import GridHeader from '~/components/GridHeader'
import DeleteDialog from '~/components/DialogDelete'
import { selectGridState, mapGridActions } from '~/utils/dxGridHelpers'
import { ACTIONS as DATA_ACTIONS } from '../../redux/BusinessUnit/businessUnit.actions'
import { getBusinessUnits, getBusinessUnit } from '../../redux/BusinessUnit/businessUnit.selector'
import { ACTIONS as LIST_ACTIONS } from './redux/businessUnitList.actions'

const styles = theme => ({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 96px)',
    padding: '80px 16px 16px'
  },
  informer: {
    padding: 16
  }
})

class BusinessUnits extends React.PureComponent {
  state = {
    deleteDialog: false
  }

  constructor (props, context) {
    super(props, context)

    this.columns = [
      {
        name: 'name',
        caption: props.intl.formatMessage({ id: 'businessUnit.grid.header.businessUnit' })
      }
    ]
  }

  componentDidMount () {
    const { getBusinessUnits } = this.props
    getBusinessUnits()
  }

  handleAdd = () => {
    const { changeAddedRows } = this.props
    changeAddedRows(Object.assign({}, [{ name: '' }]))
  }

  handleAddSave = newBusinessUnit => {
    if (!newBusinessUnit.name.length) return

    const {
      changeAddedRows,
      createBusinessUnit
    } = this.props

    createBusinessUnit(newBusinessUnit)
    changeAddedRows([])
  }

  handleEdit = editingIds => {
    const { changeEditingRowIds, getBusinessUnit } = this.props

    if (editingIds.length) getBusinessUnit(editingIds[0])
    changeEditingRowIds(editingIds)
  }

  handleUpdate = businessUnit => {
    const {
      updateBusinessUnit,
      changeEditingRowIds
    } = this.props

    updateBusinessUnit(businessUnit)
    changeEditingRowIds([])
  }

  handleDeleteDialogOpen = businessUnit => {
    this.props.getBusinessUnit(businessUnit.id)
    this.setState({ deleteDialog: true })
  }
  handleDeleteDialogClose = () => this.setState({ deleteDialog: false })
  handleDeleteDialogConfirm = () => {
    const { businessUnit, deleteBusinessUnit } = this.props
    deleteBusinessUnit(businessUnit.id)
    this.handleDeleteDialogClose()
  }

  render () {
    const {
      classes,
      addedRows,
      changeAddedRows,
      selectedRows,
      changeSelection,
      editingRowIds,
      changeRowChanges,
      rowChanges,
      businessUnits,
      businessUnit
    } = this.props

    const { deleteDialog } = this.state

    const showGrid = businessUnits.length || Object.keys(addedRows).length !== 0

    return (
      <React.Fragment>
        <AppBar title='Business Units' />

        <div className={classes.root}>
          <ButtonAdd onClick={this.handleAdd} />
          <Paper>
            <GridHeader title={'Business units list'} recordsCount={businessUnits.length} />

            {showGrid &&
              <Grid
                rows={businessUnits}
                columns={this.columns}

                addedRows={addedRows}
                onAddedRowsChange={changeAddedRows}
                onSaveAddedRow={this.handleAddSave}

                editEnabled
                onEditingRowIdsChange={this.handleEdit}
                onRowChangesChange={changeRowChanges}
                onSaveEditedRow={this.handleUpdate}
                editingRowIds={editingRowIds}
                rowChanges={rowChanges}

                onSelectedRowIdsChange={changeSelection}
                selectedRowIds={selectedRows}
                inlineDeleteEnabled
                onDeleteClick={this.handleDeleteDialogOpen}

                actionsOnHover
                hover/>}

            {!showGrid && <Typography className={classes.informer}>To add new Business Unit click in the plus button</Typography>}

            <DeleteDialog
              isOpen={deleteDialog}
              title='Delete source'
              content={`Business Unit - ${businessUnit ? businessUnit.name : ''} and all the related information will be deleted. Are you sure?`}
              onConfirm={this.handleDeleteDialogConfirm}
              onCancel={this.handleDeleteDialogClose} />
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

BusinessUnits.propTypes = {
  classes: PropTypes.object,
  intl: PropTypes.object,
  addedRows: PropTypes.any,
  changeAddedRows: PropTypes.func,
  selectedRows: PropTypes.array,
  changeSelection: PropTypes.func,
  editingRowIds: PropTypes.array,
  changeEditingRowIds: PropTypes.func,
  changeRowChanges: PropTypes.func,
  rowChanges: PropTypes.any,
  businessUnits: PropTypes.array,
  businessUnit: PropTypes.object,
  getBusinessUnits: PropTypes.func,
  getBusinessUnit: PropTypes.func,
  createBusinessUnit: PropTypes.func,
  deleteBusinessUnit: PropTypes.func,
  updateBusinessUnit: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  ...selectGridState(state.pages.businessUnits),
  businessUnits: getBusinessUnits(state),
  businessUnit: getBusinessUnit(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...mapGridActions(dispatch, LIST_ACTIONS),
  getBusinessUnits: () => dispatch(DATA_ACTIONS.getList()),
  getBusinessUnit: id => dispatch(DATA_ACTIONS.getById(id)),
  createBusinessUnit: businessUnit => dispatch(DATA_ACTIONS.create(businessUnit)),
  updateBusinessUnit: businessUnit => dispatch(DATA_ACTIONS.update(businessUnit)),
  deleteBusinessUnit: id => dispatch(DATA_ACTIONS.delete(id))
})

export default withStyles(styles)(injectIntl(connect(mapStateToProps, mapDispatchToProps)(BusinessUnits)))
