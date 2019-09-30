import React from 'react'
import PropTypes from 'prop-types'
import { BaseWidget } from 'storm-react-diagrams'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  port: {
    width: 17,
    height: 17,
    border: '3px solid rgba(255,255,255,0.5)',
    borderRadius: '50%'
  },
  innerCircle: {
    width: 7,
    height: 7,
    margin: 2,
    background: 'rgba(255,255,255,0.5)',
    borderRadius: '50%'
  },
  portLine: {
    width: 10,
    height: 3,
    background: 'rgba(255,255,255,0.5)'
  }
})

class InputPortWidget extends BaseWidget {
  constructor (props) {
    super('srd-port', props)
    this.state = {
      selected: false
    }
  }

  getClassName () {
    const { classes } = this.props
    return 'port ' + classes.port
  }

  render () {
    const { classes } = this.props
    return (
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item>
          <div
            {...this.getProps()}
            onMouseEnter={() => this.setState({ selected: true })}
            onMouseLeave={() => this.setState({ selected: false })}
            data-name={this.props.name}
            data-nodeid={this.props.node.getID()}
          >
            <div className={classes.innerCircle} />
          </div>
        </Grid>
        <Grid item>
          <div className={classes.portLine} />
        </Grid>
      </Grid>
    )
  }
}

InputPortWidget.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  node: PropTypes.any
}

export default withStyles(styles)(InputPortWidget)
