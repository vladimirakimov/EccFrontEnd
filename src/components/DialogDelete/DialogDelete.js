import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

function Transition (props) {
  return <Slide direction="up" {...props} />
}

const DialogDelete = ({ isOpen, title, content, onConfirm, onCancel }) =>
  <Dialog
    open={isOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={onCancel}
    aria-labelledby="delete-team-dialog-title"
    aria-describedby="delete-team-dialog-description"
    maxWidth='xs'>
    <DialogTitle id="delete-team-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="delete-team-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>

DialogDelete.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}

export default DialogDelete
