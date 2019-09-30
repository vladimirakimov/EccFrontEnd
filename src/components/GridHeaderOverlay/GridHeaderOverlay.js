import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
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

const GridHeaderOverlay = ({ classes, numSelected, onDelete }) =>
  <Toolbar className={classNames(classes.root, classes.highlight)}>
    <div className={classes.title}>
      <Typography color="inherit" variant="subheading">
        {numSelected} selected
      </Typography>
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      <IconButton aria-label="Delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  </Toolbar>

GridHeaderOverlay.propTypes = {
  classes: PropTypes.object,
  numSelected: PropTypes.number,
  onDelete: PropTypes.func
}

export default withStyles(styles)(GridHeaderOverlay)
