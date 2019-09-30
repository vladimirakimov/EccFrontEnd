import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TableCell from '@material-ui/core/TableCell'
import SvgIcon from '@material-ui/core/SvgIcon'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar'
import ButtonAdd from '~/components/ButtonAdd'
import GridHeader from '~/components/GridHeader'
import GridSelectCell from '~/components/GridSelectCell'
import { selectGridState, mapGridActions } from '~/utils/dxGridHelpers'
import { getWorkOrders } from '../../../redux/WorkOrder/workorder.selector'
import { getOperations } from '../../../redux/Operation/operation.selector'
import { getSites, getCustomers } from '../../../redux/ConfigurationData/configurationData.selector'
import { ACTIONS as DATA_ACTIONS_WORK_WORDERS } from '../../../redux/WorkOrder/workorder.actions'
import { ACTIONS as LIST_ACTIONS } from './redux/workOrderList.actions'
import NewWorkOrderDialog from './components/NewWorkOrderDialog'

const styles = () => ({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 96px)',
    padding: '80px 16px 16px'
  },
  iconBlock: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8
  }
})

class WorkOrders extends React.PureComponent {
  state = {
    addDialog: false,
    siteDepartments: []
  }

  constructor (props, context) {
    super(props, context)

    this.columns = [{
      name: 'status',
      caption: 'Status'
    }, {
      name: 'operation',
      caption: 'Operation',
      displayCell: (value) => {
        const { classes, operations } = this.props
        const operation = operations.find(o => o.name === value)
        const iconPath = operation ? operation.icon.dataPath : null

        return (
          <TableCell>
            <span className={classes.iconBlock}>
              <SvgIcon className={classes.icon} color="primary">
                <path d={iconPath} />
              </SvgIcon>
              {value}
            </span>
          </TableCell>
        )
      },
      editCell: (value, onChange) =>
        <GridSelectCell
          suggestions={this.props.operations}
          field={'name'}
          value={value}
          onChange={onChange} />
    }, {
      name: 'extraInformation',
      caption: 'Extra Information'
    }, {
      name: 'site',
      caption: 'Site',
      editCell: (value, onChange) =>
        <GridSelectCell
          suggestions={this.props.sites}
          field={'name'}
          value={value}
          onChange={onChange} />
    }, {
      name: 'operationalDepartment',
      caption: 'Department',
      editCell: (value, onChange) =>
        <GridSelectCell
          suggestions={this.state.siteDepartments}
          field={'name'}
          value={value}
          onChange={onChange} />
    }, {
      name: 'customer',
      caption: 'Customer',
      editCell: (value, onChange) =>
        <GridSelectCell
          suggestions={this.props.customers}
          field={'name'}
          value={value}
          onChange={onChange}/>
    }, {
      name: 'source',
      caption: 'Source'
    }]
  }

  componentDidMount () {
    const {
      getWorkOrders
    } = this.props

    getWorkOrders()
  }

  handleAddDialogOpen = () => {
    this.setState({
      addDialog: true
    })
  }

  handleAddDialogClose = () => {
    this.setState({
      addDialog: false
    })
  }

  handleAddDialogSubmit = (workOrder, { setSubmitting, setErrors, resetForm }) => {
    const { createWorkOrder } = this.props
    createWorkOrder(workOrder)
    resetForm()
    this.setState({
      addDialog: false
    })
  }

  handleEdit = ids => {
    const {
      workOrders,
      sites,
      changeEditingRowIds
    } = this.props

    if (ids.length) {
      const workOrder = workOrders.find(o => o.id === ids[0])
      const site = sites.find(s => s.name === workOrder.site)

      this.setState({
        siteDepartments: site.operationalDepartments
      })
    }

    changeEditingRowIds(ids)
  }

  handleChange = changedRow => {
    const {
      workOrders,
      sites,
      changeRowChanges
    } = this.props

    const workOrder = workOrders.find(o => changedRow[o.id])
    let changedWorkOrder = changedRow[workOrder.id]

    if (changedWorkOrder.site && workOrder.site !== changedWorkOrder.site) {
      const site = sites.find(s => s.name === changedWorkOrder.site)
      this.setState({
        siteDepartments: site.operationalDepartments
      })
    }

    changeRowChanges(changedRow)
  }

  handleUpdate = workOrder => {
    const {
      updateWorkOrder,
      editingRowIds,
      changeEditingRowIds
    } = this.props

    const remainedIds = editingRowIds.filter(id => id !== workOrder.id)

    updateWorkOrder(workOrder)
    changeEditingRowIds(remainedIds)
  }

  handleDelete = () => {
    const {
      selectedRows,
      deleteWorkOrders,
      changeSelection
    } = this.props

    deleteWorkOrders(selectedRows)
    changeSelection([])
  }

  render () {
    const {
      classes,
      workOrders,
      selectedRows,
      rowChanges,
      editingRowIds,
      changeSelection
    } = this.props

    const { addDialog } = this.state

    return (
      <React.Fragment>
        <AppBar title='Work Orders' />

        <div className={classes.root}>
          <ButtonAdd onClick={this.handleAddDialogOpen} />

          <Paper>
            <GridHeader
              title={'Work orders list'}
              recordsCount={workOrders.length}
              numSelected={selectedRows.length}
              onDelete={this.handleDelete} />

            {workOrders.length > 0 &&
              <Grid
                rows={workOrders}
                columns={this.columns}

                editEnabled
                onEditingRowIdsChange={this.handleEdit}
                onRowChangesChange={this.handleChange}
                onSaveEditedRow={this.handleUpdate}
                editingRowIds={editingRowIds}
                rowChanges={rowChanges}

                selectionEnabled
                onSelectedRowIdsChange={changeSelection}
                selectedRowIds={selectedRows}

                actionsOnHover
                hover
              />
            }

            {workOrders.length === 0 &&
              <Typography style={{ padding: 16 }} gutterBottom noWrap>
                {'To create new work order click "+" button.'}
              </Typography>
            }
          </Paper>
        </div>
        <NewWorkOrderDialog
          isOpen={addDialog}
          onClose={this.handleAddDialogClose}
          onSubmit={this.handleAddDialogSubmit}
        />
      </React.Fragment>
    )
  }
}

WorkOrders.propTypes = {
  classes: PropTypes.object,
  sites: PropTypes.array,
  customers: PropTypes.array,
  operations: PropTypes.array,
  workOrders: PropTypes.array,
  getWorkOrders: PropTypes.func,
  createWorkOrder: PropTypes.func,
  updateWorkOrder: PropTypes.func,
  selectedRows: PropTypes.array,
  changeSelection: PropTypes.func,
  editingRowIds: PropTypes.array,
  changeEditingRowIds: PropTypes.func,
  rowChanges: PropTypes.object,
  changeRowChanges: PropTypes.func,
  deleteWorkOrders: PropTypes.func
}

const mapStateToProps = (state) => ({
  ...selectGridState(state.pages.workOrders),
  sites: getSites(state),
  customers: getCustomers(state),
  operations: getOperations(state),
  workOrders: getWorkOrders(state)
})

const mapDispatchToProps = (dispatch) => ({
  ...mapGridActions(dispatch, LIST_ACTIONS),
  getWorkOrders: () => dispatch(DATA_ACTIONS_WORK_WORDERS.getList()),
  createWorkOrder: workOrder => dispatch(DATA_ACTIONS_WORK_WORDERS.create(workOrder)),
  updateWorkOrder: workOrder => dispatch(DATA_ACTIONS_WORK_WORDERS.update(workOrder)),
  deleteWorkOrders: ids => dispatch(DATA_ACTIONS_WORK_WORDERS.delete(ids))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WorkOrders))
