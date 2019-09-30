import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import NodeCard from './NodeCard'
import InputPortWidget from '../../../common/InputPortWidget'
import OutputPortWidget from '../../../common/OutputPortWidget'

class NodeWidget extends React.Component {
  handleNameChange = e => {
    const { node } = this.props
    node.name = e.target.value
    this.forceUpdate()
  }

  render () {
    const { node } = this.props

    const inputPort = Object.keys(node.ports)
      .filter(key => node.ports[key].in === true)
      .map(key => node.ports[key])[0]

    const outputPort = Object.keys(node.ports)
      .filter(key => node.ports[key].in === false)
      .map(key => node.ports[key])[0]

    return (
      <Grid container alignItems='center' direction='row' justify='center'>
        {!node.freeAction &&
          <Grid item>
            <InputPortWidget name={inputPort.name} node={node} />
          </Grid>
        }
        <Grid item>
          <NodeCard
            node={node}
            title={node.name}
            onNameChange={this.handleNameChange} />
        </Grid>
        {!node.freeAction &&
          <Grid item>
            <OutputPortWidget name={outputPort.name} node={node} />
          </Grid>
        }
      </Grid>
    )
  }
}

NodeWidget.propTypes = {
  node: PropTypes.any
}

export default NodeWidget
