import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ExtensionIcon from '@material-ui/icons/Extension'

import InputPortWidget from '../Common/InputPortWidget'

const styles = () => ({
  formControl: {
    width: '100%'
  }
})

class NodeWidget extends React.Component {
  handleNameChange = e => {
    const { node } = this.props
    node.name = e.target.value
    this.forceUpdate()
  }

  handleTypeChange = e => {
    const { node } = this.props
    node.moduleType = e.target.value
    this.forceUpdate()
  }

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
                  <ExtensionIcon />
                </Avatar>
              }
              title={<TextField
                value={node.name}
                onChange={this.handleNameChange}
              />}
              subheader='Module'
            />
            <CardContent>
              <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={node.moduleType}
                  onChange={this.handleTypeChange}
                >
                  <MenuItem value='stockview'>Stock View</MenuItem>
                  <MenuItem value='shiftgoods'>Shift Goods</MenuItem>
                  <MenuItem value='shiftondemand'>Shift on Demand</MenuItem>
                  <MenuItem value='cyclecount'>Cycle Count</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
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
