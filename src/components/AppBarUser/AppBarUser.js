import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  userMenu: {
    top: 49
  }
})

class AppBarUser extends React.PureComponent {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleToggleTheme = () => {
    const { toggleTheme } = this.props
    toggleTheme()
  }

  render () {
    const { classes, isDarkThemeSelected } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? 'user-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit">
          <AccountCircle />
        </IconButton>

        <Menu
          id="user-appbar"
          className={classes.userMenu}
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>User menu 1</MenuItem>
          <MenuItem onClick={this.handleClose}>User menu 2</MenuItem>
          <MenuItem button>
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkThemeSelected}
                  onChange={this.handleToggleTheme}
                />}
              label="Dark mode"/>
          </MenuItem>
        </Menu>
      </React.Fragment>
    )
  }
}

AppBarUser.propTypes = {
  classes: PropTypes.object,
  toggleTheme: PropTypes.func,
  isDarkThemeSelected: PropTypes.bool
}

export default withStyles(styles)(AppBarUser)
