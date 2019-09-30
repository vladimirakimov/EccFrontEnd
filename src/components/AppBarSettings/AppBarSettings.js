import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import { withStyles } from '@material-ui/core/styles'
import Settings from '@material-ui/icons/Settings'

import { ROUTES } from '../../modules/eOrderControlCenter/routes/config'

const styles = theme => ({
  settingsMenu: {
    top: 49
  },
  settingsMenuItem: {
    padding: 8,
    '&.active *': {
      color: theme.palette.primary.main
    }
  },
  settingsMenuIcon: {
    margin: '0 8px',
    fontSize: 18
  },
  settingsMenuText: {
    padding: '0 8px'
  }
})

const items = [{
  route: ROUTES.BUSINESS_UNITS,
  icon: <path d="M9,19V13H11L13,13H15V19H18V10.91L12,4.91L6,10.91V19H9M12,2.09L21.91,12H20V21H13V15H11V21H4V12H2.09L12,2.09Z" />,
  title: 'settingsnav.businessUnits'
}, {
  route: ROUTES.SOURCES,
  icon: <path d="M12,3A9,9 0 0,0 3,12H0L4,16L8,12H5A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z" />,
  title: 'settingsnav.sources'
}, {
  route: ROUTES.OPERATIONS,
  icon: <path d="M6,4V11H4C2.89,11 2,11.89 2,13V17A3,3 0 0,0 5,20A3,3 0 0,0 8,17H10A3,3 0 0,0 13,20A3,3 0 0,0 16,17V13L12,4H6M17,5V19H22V17.5H18.5V5H17M7.5,5.5H11.2L14.5,13H7.5V5.5M5,15.5A1.5,1.5 0 0,1 6.5,17A1.5,1.5 0 0,1 5,18.5A1.5,1.5 0 0,1 3.5,17A1.5,1.5 0 0,1 5,15.5M13,15.5A1.5,1.5 0 0,1 14.5,17A1.5,1.5 0 0,1 13,18.5A1.5,1.5 0 0,1 11.5,17A1.5,1.5 0 0,1 13,15.5Z" />,
  title: 'settingsnav.operations'
}, {
  route: ROUTES.ICONS,
  icon: <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />,
  title: 'settingsnav.icons'
}]

class SettingsNav extends React.Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    const menuItems = items.map(item => {
      return (
        <MenuItem
          key={item.route}
          to={item.route}
          component={NavLink}
          className={classes.settingsMenuItem}
          onClick={this.handleMenuClose}
          button>
          <ListItemIcon className={classes.settingsMenuIcon}><SvgIcon>{item.icon}</SvgIcon></ListItemIcon>
          <ListItemText className={classes.settingsMenuText}><FormattedMessage id={item.title} /></ListItemText>
        </MenuItem>
      )
    })

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? 'settings-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit">
          <Settings />
        </IconButton>

        <Menu
          id="settings-appbar"
          className={classes.settingsMenu}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={open}
          onClose={this.handleClose}>
          {menuItems}
        </Menu>
      </React.Fragment>
    )
  }
}

SettingsNav.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(SettingsNav)
