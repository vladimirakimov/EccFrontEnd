import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'

import OutputPortWidget from '../Common/OutputPortWidget'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2
  },
  outputPort: {
    marginRight: -27
  }
})

class NodeCardItem extends React.PureComponent {
  render () {
    const {
      classes,
      node,
      port,
      onClick,
      onDelete
    } = this.props

    const avatar = port.image && port.image.length ? <Avatar src={port.image} /> : null

    return (
      <Grid container direction='row' justify='flex-end' alignItems='center'>
        <Grid item>
          <Chip
            avatar={avatar}
            label={port.name}
            className={classes.chip}
            onClick={onClick}
            onDelete={onDelete} />
        </Grid>
        <Grid item className={classes.outputPort}>
          <OutputPortWidget name={port.name} node={node} />
        </Grid>
      </Grid>
    )
  }
}

NodeCardItem.propTypes = {
  classes: PropTypes.object,
  port: PropTypes.any,
  node: PropTypes.any,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
}

export default withStyles(styles)(NodeCardItem)
