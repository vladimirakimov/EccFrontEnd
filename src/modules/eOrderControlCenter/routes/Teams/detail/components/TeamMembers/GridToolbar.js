import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dak
      },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
})

const GridToolbar = ({ classes, numSelected, onDelete, onAdd }) =>
  <Toolbar
    className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0
    })}
  >
    <div className={classes.title}>
      {numSelected > 0 &&
        <Typography color='inherit' variant='subheading'>
          {numSelected} selected
        </Typography>
      }
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='Delete' onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Add'>
          <IconButton aria-label='Add' onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  </Toolbar>

GridToolbar.propTypes = {
  classes: PropTypes.object,
  numSelected: PropTypes.number,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func
}

export default withStyles(styles)(GridToolbar)
