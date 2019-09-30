import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import InputPortWidget from '../Common/InputPortWidget'

const styles = theme => ({
  actionButton: {
    marginLeft: theme.spacing.unit
  }
})

class NodeWidget extends React.Component {
  render () {
    const { classes, node } = this.props
    const inputPort = Object.keys(node.ports)
      .filter(key => node.ports[key].in === true)
      .map(key => node.ports[key])[0]

    return (
      <Grid container alignItems='baseline' direction='row' justify='center'>
        <Grid item>
          <InputPortWidget name={inputPort.name} node={node} />
        </Grid>
        <Grid item>
          <Card raised={node.selected} style={{
            maxWidth: 350
          }}>
            <CardHeader
              avatar={
                <Avatar>
                  <ViewModuleIcon />
                </Avatar>
              }
              action={
                <IconButton className={classes.actionButton}>
                  <MoreVertIcon />
                </IconButton>
              }
              title='My Matrix Screen'
              subheader='Matrix Screen'
            />
          </Card>
        </Grid>
      </Grid>
    )
  }
}

NodeWidget.propTypes = {
  classes: PropTypes.object,
  size: PropTypes.number,
  node: PropTypes.any
}

NodeWidget.defaultProps = {
  size: 150,
  node: null
}

export default withStyles(styles)(NodeWidget)
