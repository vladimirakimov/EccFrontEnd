import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar/AppBar'
import ButtonAdd from '~/components/ButtonAdd'

const styles = theme => ({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 96px)',
    padding: '80px 16px 16px'
  }
})

class Barcodes extends React.PureComponent {
  render () {
    const { classes } = this.props

    return (
      <React.Fragment>
        <AppBar title='Barcodes' />

        <div className={classes.root}>
          <ButtonAdd />

          <p>ECC Updated Layout - Barcodes page</p>
        </div>
      </React.Fragment>
    )
  }
}

Barcodes.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(Barcodes)
