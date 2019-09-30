import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PeopleIcon from '@material-ui/icons/People'

import AppBar from '~/components/AppBar'
import ButtonAdd from '~/components/ButtonAdd'
import OverviewCard from '~/components/OverviewCard'
import DeleteDialog from '~/components/DialogDelete'
import { generateRoute } from '~/utils/routeGenerator'
import { ACTIONS as DATA_ACTIONS } from '../../../redux/Team/team.actions'
import { getTeam, getTeams } from '../../../redux/Team/team.selector'
import { ROUTES } from '../../config'
import CreateDialog from './components/CreateDialog'

const styles = theme => ({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 96px)',
    padding: '80px 16px 16px'
  },
  cardSubtitleIcon: {
    fontSize: 16,
    marginRight: theme.spacing.unit,
    verticalAlign: 'text-bottom'
  }
})

class TeamList extends React.PureComponent {
  state = {
    teams: null,
    searchString: null,
    createDialog: false,
    deleteDialog: false
  }

  componentDidMount () {
    const { getTeams } = this.props
    getTeams()
  }

  handleCreateDialogOpen = () => {
    this.setState({
      createDialog: true
    })
  }

  handleCreateDialogClose = () => {
    this.setState({
      createDialog: false
    })
  }

  handleCreateDialogSubmit = (newTeam, { setSubmitting, setErrors, resetForm }) => {
    const { createTeam } = this.props

    createTeam(newTeam)
    resetForm()

    this.setState({
      createDialog: false
    })
  }

  handleDeleteDialogOpen = team => {
    this.props.getTeam(team.id)

    this.setState({ deleteDialog: true })
  }

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false })
  }

  handleDeleteDialogConfirm = () => {
    const { team, deleteTeam } = this.props

    deleteTeam(team.id)
    this.handleDeleteDialogClose()
  }

  handleSearchChange = value => {
    this.filterTeams(value)
  }

  filterTeams = newSearchString => {
    const { teams } = this.props
    let searchString = newSearchString
    if (searchString === undefined) {
      searchString = this.state.searchString
    }

    if (searchString === null || searchString === '') {
      this.setState({ teams })

      return
    }

    this.setState({ searchString })
    const words = searchString.split(' ')
    const filtered = teams.filter(team => {
      return words.every(word => {
        return team.name.toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })

    this.setState({
      teams: filtered
    })
  }

  componentDidUpdate (oldProps) {
    if (this.props.teams !== oldProps.teams) {
      this.filterTeams()
    }
  }

  handleDetailClicked = team => {
    const { history } = this.props
    history.push(generateRoute(ROUTES.TEAMDETAIL, { id: team.id }))
  }

  render () {
    const { classes, team } = this.props
    const {
      teams,
      createDialog,
      deleteDialog
    } = this.state

    return (
      <React.Fragment>
        <AppBar
          isSearchBarAvailable={true}
          onSearchChange={this.handleSearchChange}
          title='Teams' />

        <div className={classes.root}>
          <ButtonAdd onClick={this.handleCreateDialogOpen} />

          <Grid container spacing={8} alignItems='stretch'>
            {teams && teams.map((team, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                <OverviewCard
                  mediaImage={team.image || 'http://apps.carleton.edu/reason_package/reason_4.0/www/images_local/650497.jpg'}
                  mediaTitle={team.name}
                  title={team.name}
                  subTitle={(
                    <React.Fragment>
                      <PeopleIcon className={classes.cardSubtitleIcon} />
                      {team.operators && team.operators.length} members
                    </React.Fragment>
                  )}
                  content={team.description}
                  onDetailClicked={() => this.handleDetailClicked(team)}
                  onDeleteClicked={() => this.handleDeleteDialogOpen(team)}
                />
              </Grid>
            ))}
          </Grid>
        </div>

        <CreateDialog
          isOpen={createDialog}
          onClose={this.handleCreateDialogClose}
          onSubmit={this.handleCreateDialogSubmit} />

        <DeleteDialog
          isOpen={deleteDialog}
          title='Delete team'
          content={`Team ${team ? team.name : ''} and all the related information will be deleted. Are you sure?`}
          onConfirm={this.handleDeleteDialogConfirm}
          onCancel={this.handleDeleteDialogClose} />
      </React.Fragment>
    )
  }
}

TeamList.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  teams: PropTypes.array,
  getTeams: PropTypes.func,
  team: PropTypes.object,
  getTeam: PropTypes.func,
  createTeam: PropTypes.func,
  deleteTeam: PropTypes.func
}

const mapStateToProps = (state) => ({
  team: getTeam(state),
  teams: getTeams(state)
})

const mapDispatchToProps = (dispatch) => ({
  getTeam: id => dispatch(DATA_ACTIONS.getById(id)),
  getTeams: () => dispatch(DATA_ACTIONS.getList()),
  createTeam: newTeam => dispatch(DATA_ACTIONS.create(newTeam)),
  deleteTeam: teamId => dispatch(DATA_ACTIONS.delete(teamId))
})

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TeamList)))
