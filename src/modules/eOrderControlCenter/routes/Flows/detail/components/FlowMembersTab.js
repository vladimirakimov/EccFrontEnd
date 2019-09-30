import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  }
})

class FlowMembersTab extends React.PureComponent {
  constructor (props) {
    super(props)

    this.columns = [
      { name: 'name', caption: 'Name' }
    ]
  }

  render () {
    const { classes, members } = this.props
    return (
      <div className={classes.root}>
        <Paper>
          <Grid
            rows={members}
            columns={this.columns}
            selectedRowIds={[]}
          />
        </Paper>
      </div>
    )
  }
}

FlowMembersTab.propTypes = {
  classes: PropTypes.object,
  members: PropTypes.array
}

export default withStyles(styles)(FlowMembersTab)
