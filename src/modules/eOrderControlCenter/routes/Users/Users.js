import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar/AppBar'
import ButtonAdd from '~/components/ButtonAdd'
import GridHeader from '~/components/GridHeader'
import { selectGridState, mapGridActions } from '~/utils/dxGridHelpers'
import { getUsers, userCreateModal, getUser } from '../../redux/User/user.selector'
import { ACTIONS as DATA_ACTIONS } from '../../redux/User/user.actions'
import { ACTIONS as LIST_ACTIONS } from './redux/userList.actions'
import DeleteUserDialog from './components/DeleteUserDialog'
import CreateUserDialog from './components/CreateUserDialog'
import EditUserDialog from './components/EditUserDialog'

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

class Users extends React.PureComponent {
  state = {
    deleteDialogOpen: false,
    editDialogOpen: false,
    selectedUser: {}
  }

  constructor (props, context) {
    super(props, context)

    this.columns = [
      { name: 'firstName', caption: 'First Name' },
      { name: 'lastName', caption: 'Last Name' },
      { name: 'login', caption: 'Login' }
    ]
  }

  componentDidMount () {
    const { getUsers } = this.props
    getUsers()
  }

  handleDelete = user => {
    this.props.getUser(user.id)
    this.setState({ deleteDialogOpen: true })
  }
  handleDeleteDialogClose = () => this.setState({ deleteDialogOpen: false })

  handleConfirmDelete = () => {
    const { selectedUser, deleteUser } = this.props

    deleteUser(selectedUser.id)

    this.setState({ deleteDialogOpen: false })
  }

  handleAdd = () => this.props.openCreateModal()
  handleAddDialogClose = () => this.props.hideCreateModal()

  handleCreateUserDialogSubmit = (user) => {
    const { createUser } = this.props

    createUser(user)
  }

  handleOnEditingRowIdsChange = rowIds => {
    const { users, getUser } = this.props
    const id = users.find(x => x.id === rowIds[0]).id

    getUser(id)
    this.setState({
      editDialogOpen: true
    })
  }

  handleEditDialogClose = () => this.setState({ editDialogOpen: false })

  handleEditUserDialogSubmit = (user, { resetForm }) => {
    const { updateUser, selectedUser } = this.props

    const transformedUser = {
      id: selectedUser.id
    }

    for (const key in user) {
      if (user[key]) {
        transformedUser[key] = user[key]
      }
    }

    this.setState({ editDialogOpen: false })
    updateUser(transformedUser)
    resetForm()
  }

  render () {
    const {
      editDialogOpen,
      deleteDialogOpen
    } = this.state

    const {
      classes,
      users,
      changeSelection,
      selectedRows,
      changeRowChanges,
      editingRowIds,
      rowChanges,
      createModal,
      selectedUser
    } = this.props

    const showGrid = users.length

    return (
      <React.Fragment>
        <AppBar title='Operators' />

        <div className={classes.root}>
          <ButtonAdd onClick={this.handleAdd} />

          <Paper>
            <GridHeader
              title={'Operators list'}
              recordsCount={users.length} />

            {showGrid &&
              <Grid
                rows={users}
                columns={this.columns}

                editEnabled
                onEditingRowIdsChange={this.handleOnEditingRowIdsChange}
                onRowChangesChange={changeRowChanges}
                editingRowIds={editingRowIds}
                rowChanges={rowChanges}

                onSelectedRowIdsChange={changeSelection}
                selectedRowIds={selectedRows}
                inlineDeleteEnabled
                onDeleteClick={this.handleDelete}

                actionsOnHover
                hover />}

            {!showGrid && <Typography className={classes.informer}>To add new Operator click in the plus button</Typography>}
          </Paper>
        </div>

        <CreateUserDialog
          open={createModal}
          onClose={this.handleAddDialogClose}
          onSubmit={this.handleCreateUserDialogSubmit} />

        <EditUserDialog
          open={editDialogOpen}
          selectedUser={selectedUser}
          onClose={this.handleEditDialogClose}
          onSubmit={this.handleEditUserDialogSubmit} />

        <DeleteUserDialog
          open={deleteDialogOpen}
          selectedUser={selectedUser}
          onClose={this.handleDeleteDialogClose}
          onCancel={this.handleDeleteDialogClose}
          onConfirm={this.handleConfirmDelete} />
      </React.Fragment>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object,

  changeSelection: PropTypes.func,
  selectedRows: PropTypes.array,

  changeRowChanges: PropTypes.func,
  editingRowIds: PropTypes.array,
  rowChanges: PropTypes.object,

  users: PropTypes.array,
  usersErrors: PropTypes.array,
  getUsers: PropTypes.func,
  getUser: PropTypes.func,
  createUser: PropTypes.func,
  updateUser: PropTypes.func,
  deleteUser: PropTypes.func,

  createModal: PropTypes.bool,
  openCreateModal: PropTypes.func,
  hideCreateModal: PropTypes.func,
  selectedUser: PropTypes.object
}

const mapStateToProps = (state) => ({
  ...selectGridState(state.pages.users),
  users: getUsers(state),
  selectedUser: getUser(state),
  createModal: userCreateModal(state)
})

const mapDispatchToProps = (dispatch) => ({
  ...mapGridActions(dispatch, LIST_ACTIONS),
  getUsers: () => dispatch(DATA_ACTIONS.getList()),
  getUser: id => dispatch(DATA_ACTIONS.getById(id)),
  deleteUser: id => dispatch(DATA_ACTIONS.delete(id)),
  createUser: value => dispatch(DATA_ACTIONS.create(value)),
  updateUser: value => dispatch(DATA_ACTIONS.update(value)),
  openCreateModal: () => dispatch(DATA_ACTIONS.showCreateDialog()),
  hideCreateModal: () => dispatch(DATA_ACTIONS.hideCreateDialog())
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Users))
