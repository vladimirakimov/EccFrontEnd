import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import AddIcon from '@material-ui/icons/Add'

const styles = () => ({
  button: {
    position: 'fixed',
    top: 73,
    left: 213,
    width: 46,
    height: 46,
    transition: '0.5s',
    zIndex: 3
  },
  buttonSmall: {
    top: 80,
    left: 57,
    width: 32,
    height: 32,
    minHeight: 32
  }
})

const ButtonAdd = ({ classes, isSidebarCollapsed, onClick }) =>
  <Button
    onClick={onClick}
    variant="fab"
    color="primary"
    aria-label="Add"
    className={classNames(classes.button, { [classes.buttonSmall]: isSidebarCollapsed })}>
    <AddIcon />
  </Button>

ButtonAdd.propTypes = {
  classes: PropTypes.object,
  isSidebarCollapsed: PropTypes.bool,
  onClick: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  isSidebarCollapsed: state.app.ui.isSidebarCollapsed
})

export default withStyles(styles)(connect(mapStateToProps)(ButtonAdd))
