import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

class Toast extends React.PureComponent {
  handleClose () {
    const { onClose } = this.props
    onClose && onClose()
  }

  render () {
    const { message, type, open } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={7000}
        onClose={this.handleClose.bind(this)}
        message={<span id="message-id">{message}, {type}</span>}
      />
    )
  }
}

Toast.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  type: PropTypes.node,
  message: PropTypes.node,
  onClose: PropTypes.func
}

export default Toast
