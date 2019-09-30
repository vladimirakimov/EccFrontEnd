import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import GridHeader from '~/components/GridHeader'
import AddTeamMemberDialog from './TeamMembers/AddTeamMemberDialog'

const styles = () => ({
  informer: {
    padding: 16
  }
})

class TeamMembersTab extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      addDialog: false,
      searchQuery: '',
      selectedRowIds: []
    }

    this.columns = [
      { name: 'login', caption: 'Login' },
      { name: 'firstName', caption: 'First Name' },
      { name: 'lastName', caption: 'Last Name' }
    ]
  }

  handleAdd = () => {
    this.setState({
      addDialog: true
    })
  }

  handleAddDialogClose = () => {
    this.setState({
      addDialog: false,
      searchQuery: ''
    })
  }

  handleChangeSelection = members => {
    const { onMembersChange } = this.props
    onMembersChange([
      ...members
    ])
  }

  handleSelectionChanged = selectedRowIds => {
    this.setState({
      selectedRowIds
    })
  }

  handleDelete = () => {
    const { members, onMembersChange } = this.props
    const { selectedRowIds } = this.state

    this.setState({
      selectedRowIds: []
    })
    onMembersChange(members.filter(x => selectedRowIds.indexOf(x.id) === -1))
  }

  handleSearchChange = searchQuery => {
    this.setState({
      searchQuery
    })
  }

  render () {
    const {
      addDialog,
      selectedRowIds,
      searchQuery
    } = this.state

    const {
      classes,
      members
    } = this.props

    const showGrid = members && members.length > 0

    return (
      <div>
        <GridHeader
          title={'Members list'}
          recordsCount={members && members.length}
          numSelected={selectedRowIds.length}
          showAddButton
          onAdd={this.handleAdd}
          onDelete={this.handleDelete}/>

        {showGrid &&
          <Grid
            rows={members}
            columns={this.columns}

            selectionEnabled
            onSelectedRowIdsChange={this.handleSelectionChanged}
            selectedRowIds={selectedRowIds}

            actionsOnHover
            hover/>
        }

        {!showGrid && <Typography className={classes.informer}>Click Add button to add member</Typography>}

        <AddTeamMemberDialog
          isOpen={addDialog}
          onClose={this.handleAddDialogClose}
          selectedMembers={members && members.map(m => m.id)}
          onChangeSelection={this.handleChangeSelection}
          searchQuery={searchQuery}
          onSearchChange={this.handleSearchChange} />
      </div>
    )
  }
}

TeamMembersTab.propTypes = {
  classes: PropTypes.object,
  members: PropTypes.array,
  onMembersChange: PropTypes.func
}

export default withStyles(styles)(TeamMembersTab)
