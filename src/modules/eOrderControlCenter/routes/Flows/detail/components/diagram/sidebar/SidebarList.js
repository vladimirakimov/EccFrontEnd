import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
// import { withStyles } from '@material-ui/core/styles'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

// const styles = () => ({
//   root: {
//     cursor: 'pointer'
//   }
// })

class SidebarList extends React.Component {
  render () {
    const { title, open, onSidebarToggle } = this.props

    return (
      <React.Fragment>
        <ListItem button onClick={onSidebarToggle}>
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.props.children}
          </List>
        </Collapse>
      </React.Fragment>
    )
  }
}

SidebarList.propTypes = {
  classes: PropTypes.object,
  model: PropTypes.object,
  icon: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
  onSidebarToggle: PropTypes.func,
  children: PropTypes.any
}

export default SidebarList
