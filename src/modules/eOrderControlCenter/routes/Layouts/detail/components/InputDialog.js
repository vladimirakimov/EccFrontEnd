import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class InputDialog extends React.PureComponent {
  render () {
    const {
      isOpen,
      dialogTitle,
      dialogContentText,
      inputLabel,
      dialogInput,
      onDialogCancel,
      onDialogConfirm,
      onInputChange,
      confirmCaption,
      errorOccured,
      errorMessage
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
          <FormControl error={errorOccured}>
            <TextField
              autoFocus
              margin='dense'
              id='input'
              label={inputLabel}
              type='text'
              text={dialogInput}
              onChange={onInputChange}
              fullWidth
              error={errorOccured}
            />
            {errorOccured &&
              <FormHelperText>{errorMessage}</FormHelperText>
            }
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogCancel} color='primary'>Cancel</Button>
          <Button onClick={onDialogConfirm} color='primary'>{confirmCaption}</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

InputDialog.propTypes = {
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string,
  dialogContentText: PropTypes.string,
  inputLabel: PropTypes.string,
  dialogInput: PropTypes.string,
  onDialogCancel: PropTypes.func,
  onDialogConfirm: PropTypes.func,
  onInputChange: PropTypes.func,
  confirmCaption: PropTypes.string,
  errorOccured: PropTypes.bool,
  errorMessage: PropTypes.string
}

export default InputDialog
