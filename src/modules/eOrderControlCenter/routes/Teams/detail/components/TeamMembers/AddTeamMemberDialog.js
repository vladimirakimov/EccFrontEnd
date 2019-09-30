import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import { getTeamOperators } from '~/modules/eOrderControlCenter/redux/TeamOperator/teamOperator.selector'
import { ACTIONS as DATA_ACTIONS } from '~/modules/eOrderControlCenter/redux/TeamOperator/teamOperator.actions'
import AddTeamMemberToolbar from './AddTeamMemberToolbar'

const styles = () => ({
  root: {
    width: 600,
    height: '100vh'
  }
})

class AddTeamMemberDialog extends React.PureComponent {
  constructor (props) {
    super(props)

    this.columns = [
      { name: 'login', caption: 'Login' },
      { name: 'firstName', caption: 'First Name' },
      { name: 'lastName', caption: 'Last Name' }
    ]
  }

  componentDidMount () {
    const { getTeamOperators } = this.props
    getTeamOperators()
  }

  handleSelectedRowsChanged = selectedIds => {
    const { operators, onChangeSelection } = this.props
    const addingUsers = operators.filter(user => selectedIds.includes(user.id))

    onChangeSelection(addingUsers)
  }

  filterUsers = () => {
    const { operators, searchQuery } = this.props

    if (searchQuery === undefined || searchQuery === null || searchQuery === '') return operators

    const filterWords = searchQuery.split(' ')
    return operators.filter(user => {
      return filterWords.every(word => {
        if (user.login && user.firstName && user.lastName) {
          return user.login.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
            user.firstName.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
            user.lastName.toLowerCase().indexOf(word.toLowerCase()) > -1
        }
      })
    })
  }

  componentWillUnmount = () => {
    const { onSearchChange } = this.props
    onSearchChange('')
  }

  render () {
    const {
      classes,
      isOpen,
      onClose,
      selectedMembers,
      onSearchChange
    } = this.props

    const users = this.filterUsers()

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{ classes: { root: classes.root } }}
        scroll='paper'
        aria-labelledby='dialog-title'>

        <AddTeamMemberToolbar onSearchChange={onSearchChange} />

        <DialogContent>
          <Grid
            rows={users}
            columns={this.columns}
            selectionEnabled
            selectedRowIds={selectedMembers}
            onSelectedRowIdsChange={this.handleSelectedRowsChanged}
          />
        </DialogContent>

        <DialogActions>
          <Button variant='text' color='primary' onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

AddTeamMemberDialog.propTypes = {
  classes: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  operators: PropTypes.array,
  selectedMembers: PropTypes.array,
  onChangeSelection: PropTypes.func,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  getTeamOperators: PropTypes.func
}

const mapStateToProps = (state) => ({
  operators: getTeamOperators(state)
})

const mapDispatchToProps = (dispatch) => ({
  getTeamOperators: () => dispatch(DATA_ACTIONS.get())
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddTeamMemberDialog))
