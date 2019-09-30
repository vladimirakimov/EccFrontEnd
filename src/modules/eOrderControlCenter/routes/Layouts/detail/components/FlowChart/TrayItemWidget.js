import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    cursor: 'pointer'
  }
})

class TrayItemWidget extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.onDragStart = this.onDragStart.bind(this)
  }

  onDragStart (event) {
    event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model))
  }

  render () {
    const { classes, icon, name } = this.props

    return (
      <ListItem
        className={classes.root}
        draggable
        onDragStart={this.onDragStart}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{name}</ListItemText>
      </ListItem>
    )
  }
}

TrayItemWidget.propTypes = {
  classes: PropTypes.object,
  model: PropTypes.object,
  icon: PropTypes.node,
  name: PropTypes.string
}

export default withStyles(styles)(TrayItemWidget)
