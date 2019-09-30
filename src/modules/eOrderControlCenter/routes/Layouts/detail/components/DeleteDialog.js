import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

class DeleteDialog extends React.PureComponent {
  render () {
    const {
      isOpen,
      dialogTitle,
      dialogContentText,
      onDialogCancel,
      onDialogConfirm
    } = this.props

    return (
      <Dialog
        open={isOpen}
        onClose={onDialogCancel}
        aria-labelledby='input-dialog-title'
      >
        <DialogTitle id='input-dialog-title'>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogCancel} color='primary'>Cancel</Button>
          <Button onClick={onDialogConfirm} color='primary'>Confirm</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string,
  dialogContentText: PropTypes.string,
  onDialogCancel: PropTypes.func,
  onDialogConfirm: PropTypes.func,
  confirmCaption: PropTypes.string
}

export default DeleteDialog
