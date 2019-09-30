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
import { ACTIONS as DATA_ACTIONS_SOURCES } from '../../redux/Source/source.actions'
import { ACTIONS as LIST_ACTIONS } from './redux/sourceList.actions'
import { ACTIONS as DATA_ACTIONS_BUSINESSUNITS } from '../../redux/BusinessUnit/businessUnit.actions'
import { getBusinessUnits } from '../../redux/BusinessUnit/businessUnit.selector'
import { getSources, getSource } from '../../redux/Source/source.selector'
import { selectGridState, mapGridActions } from '../../../../utils/dxGridHelpers'
import SourceDisplayCell from './components/SourceDisplayCell'
import SourceEditCell from './components/SourceEditCell'

const styles = () => ({
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

class Sources extends React.PureComponent {
  state = {
    deleteDialog: false
  }

  constructor (props, context) {
    super(props, context)

    this.columns = [{
      name: 'name',
      caption: props.intl.formatMessage({ id: 'source.grid.header.source' })
    }, {
      name: 'description',
      caption: props.intl.formatMessage({ id: 'source.grid.header.description' })
    }, {
      name: 'sourceBusinessUnits',
      caption: props.intl.formatMessage({ id: 'source.grid.header.businessUnits' }),
      displayCell: (value) => <SourceDisplayCell value={value} />,
      createCell: (value, onChange) => <SourceEditCell businessUnits={this.props.businessUnits} value={value} onChange={onChange} />,
      editCell: (value, onChange) => <SourceEditCell businessUnits={this.props.businessUnits} value={value} onChange={onChange} />
    }]
  }

  componentDidMount () {
    const {
      getSources,
      getBusinessUnits
    } = this.props

    getSources()
    getBusinessUnits()
  }

  handleAdd = () => {
    const { changeAddedRows } = this.props
    changeAddedRows(Object.assign({}, [{ name: '', description: '', businessUnits: '' }]))
  }

  handleAddSave = newSource => {
    if (!newSource.description || !newSource.name || this.props.sources.filter(source => source.name === newSource.name.trim()).length) return

    const {
      createSource,
      changeAddedRows
    } = this.props

    createSource(newSource)
    changeAddedRows([])
  }

  handleEdit = editingIds => {
    const { changeEditingRowIds, getSource } = this.props

    if (editingIds.length) getSource(editingIds[0])
    changeEditingRowIds(editingIds)
  }

  handleUpdate = source => {
    const {
      updateSource,
      changeEditingRowIds
    } = this.props

    updateSource(source)
    changeEditingRowIds([])
  }

  handleDeleteDialogOpen = source => {
    this.props.getSource(source.id)
    this.setState({ deleteDialog: true })
  }
  handleDeleteDialogClose = () => this.setState({ deleteDialog: false })
  handleDeleteDialogConfirm = () => {
    const { source, deleteSource } = this.props
    deleteSource(source.id)
    this.handleDeleteDialogClose()
  }

  render () {
    const {
      classes,
      addedRows,
      changeAddedRows,
      editingRowIds,
      changeRowChanges,
      rowChanges,
      selectedRows,
      changeSelection,
      sources,
      source
    } = this.props

    const { deleteDialog } = this.state

    const showGrid = sources.length || Object.keys(addedRows).length !== 0

    return (
      <React.Fragment>
        <AppBar title='Sources' />

        <div className={classes.root}>
          <ButtonAdd onClick={this.handleAdd} />

          <Paper>
            <GridHeader title={'Sources list'} recordsCount={sources.length} />

            {showGrid &&
            <Grid
              rows={sources}
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
              hover />}

            {!showGrid && <Typography className={classes.informer}>To add new Source click in the plus button</Typography>}

            <DeleteDialog
              isOpen={deleteDialog}
              title='Delete source'
              content={`Source ${source ? source.name : ''} and all the related information will be deleted. Are you sure?`}
              onConfirm={this.handleDeleteDialogConfirm}
              onCancel={this.handleDeleteDialogClose} />
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

Sources.propTypes = {
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
  getBusinessUnits: PropTypes.func,

  sources: PropTypes.array,
  source: PropTypes.object,
  getSource: PropTypes.func,
  getSources: PropTypes.func,
  createSource: PropTypes.func,
  updateSource: PropTypes.func,
  deleteSource: PropTypes.func
}

const mapStateToProps = (state) => ({
  ...selectGridState(state.pages.sources),
  sources: getSources(state),
  source: getSource(state),
  businessUnits: getBusinessUnits(state)
})

const mapDispatchToProps = (dispatch) => ({
  ...mapGridActions(dispatch, LIST_ACTIONS),
  getSource: id => dispatch(DATA_ACTIONS_SOURCES.getById(id)),
  getSources: () => dispatch(DATA_ACTIONS_SOURCES.getListSources()),
  getBusinessUnits: () => dispatch(DATA_ACTIONS_BUSINESSUNITS.getList()),
  createSource: source => dispatch(DATA_ACTIONS_SOURCES.createSource(source)),
  updateSource: source => dispatch(DATA_ACTIONS_SOURCES.updateSource(source)),
  deleteSource: sources => dispatch(DATA_ACTIONS_SOURCES.deleteSource(sources))
})

export default withStyles(styles)(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Sources)))
