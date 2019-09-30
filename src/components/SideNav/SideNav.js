import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon'
import withStyles from '@material-ui/core/styles/withStyles'

import { ROUTES } from '../../modules/eOrderControlCenter/routes/config'
import styles from './SideNav.styles'

const items = [{
  route: ROUTES.DASHBOARD,
  icon: <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z" />,
  title: 'sidenav.dashboard'
}, {
  route: ROUTES.ORDER_OVERVIEW,
  icon: <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />,
  title: 'sidenav.workOrders'
}, {
  route: ROUTES.USERS,
  icon: <path d="M12,15C7.58,15 4,16.79 4,19V21H20V19C20,16.79 16.42,15 12,15M8,9A4,4 0 0,0 12,13A4,4 0 0,0 16,9M11.5,2C11.2,2 11,2.21 11,2.5V5.5H10V3C10,3 7.75,3.86 7.75,6.75C7.75,6.75 7,6.89 7,8H17C16.95,6.89 16.25,6.75 16.25,6.75C16.25,3.86 14,3 14,3V5.5H13V2.5C13,2.21 12.81,2 12.5,2H11.5Z" />,
  title: 'sidenav.users'
}, {
  route: ROUTES.TEAMS,
  icon: <path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />,
  title: 'sidenav.teams'
}, {
  route: ROUTES.FLOWS,
  icon: <path d="M2,2V4H7V8H2V10H7C8.11,10 9,9.11 9,8V7H14V17H9V16C9,14.89 8.11,14 7,14H2V16H7V20H2V22H7C8.11,22 9,21.11 9,20V19H14C15.11,19 16,18.11 16,17V13H22V11H16V7C16,5.89 15.11,5 14,5H9V4C9,2.89 8.11,2 7,2H2Z" />,
  title: 'sidenav.flows'
}, {
  route: ROUTES.LAYOUTS,
  icon: <path d="M18.12,14.44l-3.24-1.62C16.17,11.82,17,10.26,17,8.5C17,5.47,14.53,3,11.5,3S6,5.47,6,8.5c0,2.13,1.22,3.98,3,4.89v3.26 l-1.84-0.39l-0.1-0.02c-0.1-0.02-0.2-0.03-0.32-0.03c-0.53,0-1.03,0.21-1.41,0.59l-1.4,1.42l5.09,5.09 C9.45,23.75,10.05,24,10.67,24h6.3c0.98,0,1.81-0.7,1.97-1.67l0.8-4.71C19.96,16.32,19.31,15.04,18.12,14.44z M17.77,17.29 L16.97,22h-6.3c-0.09,0-0.17-0.04-0.24-0.1l-3.68-3.68L11,19.11V8.5C11,8.22,11.22,8,11.5,8S12,8.22,12,8.5v6h1.76l3.46,1.73 C17.62,16.43,17.84,16.86,17.77,17.29z M8,8.5C8,6.57,9.57,5,11.5,5S15,6.57,15,8.5c0,0.95-0.38,1.81-1,2.44V8.5 C14,7.12,12.88,6,11.5,6S9,7.12,9,8.5v2.44C8.38,10.31,8,9.45,8,8.5z" />,
  title: 'sidenav.layouts'
}, {
  route: ROUTES.BARCODES,
  icon: <path d="M4,6H6V18H4V6M7,6H8V18H7V6M9,6H12V18H9V6M13,6H14V18H13V6M16,6H18V18H16V6M19,6H20V18H19V6M2,4V8H0V4A2,2 0 0,1 2,2H6V4H2M22,2A2,2 0 0,1 24,4V8H22V4H18V2H22M2,16V20H6V22H2A2,2 0 0,1 0,20V16H2M22,20V16H24V20A2,2 0 0,1 22,22H18V20H22Z" />,
  title: 'sidenav.barcodes'
}]

class SideNav extends React.Component {
  render () {
    const { classes, title, onLogoClicked } = this.props
    const navItems = items.map(navItem => {
      return (
        <ListItem
          key={navItem.route}
          to={navItem.route}
          component={NavLink}
          className={classes.navItem}
          button>
          <ListItemIcon><SvgIcon>{navItem.icon}</SvgIcon></ListItemIcon>
          <ListItemText><FormattedMessage id={navItem.title} /></ListItemText>
        </ListItem>
      )
    })
    return (
      <React.Fragment>
        <Typography
          variant='h6'
          color='primary'
          className={classes.logoTitle}
          onClick={onLogoClicked}>
          <span className={classes.logoTitleFirstLetter}>{title.slice(0, 1)}</span>
          {title.slice(1, title.length)}
        </Typography>
        <List component='nav'>
          {navItems}
        </List>
      </React.Fragment>
    )
  }
}

SideNav.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  onLogoClicked: PropTypes.func

}

export default withStyles(styles)(SideNav)
