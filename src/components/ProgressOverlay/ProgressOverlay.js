import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  progressContainer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  progressContent: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.5)',
    zIndex: 2
  }
})

const Progress = ({ classes, show, children }) =>
  <div className={classes.progressContainer}>
    {show ? <div className={classes.progressContent}>
      <CircularProgress color='secondary' />
    </div> : null
    }
    {children}
  </div>

Progress.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool,
  children: PropTypes.node
}

export default withStyles(styles)(Progress)
