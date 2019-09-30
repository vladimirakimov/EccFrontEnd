import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import SearchField from '~/components/SearchField'

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  title: {
    flex: '0 0 auto'
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  }
})

const AddTeamMemberToolbar = ({ classes, onSearchChange }) =>
  <Toolbar className={classNames(classes.root)}>
    <Typography className={classes.title} color='inherit' variant='h6'>
        Add Team Member
    </Typography>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      <SearchField onChange={onSearchChange} />
    </div>
  </Toolbar>

AddTeamMemberToolbar.propTypes = {
  classes: PropTypes.object,
  onSearchChange: PropTypes.func
}

export default withStyles(styles)(AddTeamMemberToolbar)
