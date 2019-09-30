import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const DeleteUserDialog = ({ open, onClose, onCancel, onConfirm, selectedUser }) =>
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>Confirm delete</DialogTitle>
    <DialogContent>
      <DialogContentText id='alert-dialog-description'>
        Are you sure you want to delete the {selectedUser.login}?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color='primary'>
        Cancel
      </Button>
      <Button onClick={onConfirm} color='primary'>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>

DeleteUserDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  selectedUser: PropTypes.object
}

export default DeleteUserDialog
