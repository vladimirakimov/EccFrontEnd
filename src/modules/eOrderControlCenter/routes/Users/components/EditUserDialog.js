import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import Yup from 'yup'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class EditUserDialog extends React.PureComponent {
  handleClose = () => {
    const { resetForm, onClose } = this.props

    resetForm()
    onClose()
  }

  render () {
    const { open, values, touched, errors, handleChange, handleBlur, handleSubmit } = this.props
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>Edit Operator</DialogTitle>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  margin="dense"
                  value={values.firstName}
                  error={errors.firstName && touched.firstName}
                  helperText={errors.firstName && touched.firstName ? errors.firstName : ' '}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  margin="dense"
                  value={values.lastName}
                  error={errors.lastName && touched.lastName}
                  helperText={errors.lastName && touched.lastName ? errors.lastName : ' '}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="login"
                  margin="dense"
                  value={values.login}
                  error={errors.login && touched.login}
                  helperText={errors.login && touched.login ? errors.login : ' '}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password (leave empty to keep unmodified)"
                  name="password"
                  margin="dense"
                  value={values.password}
                  error={errors.password && touched.password}
                  helperText={errors.password && touched.password ? errors.password : ' '}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

EditUserDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  resetForm: PropTypes.func,
  setValues: PropTypes.func,
  selectedUser: PropTypes.object
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ selectedUser }) => ({
    id: selectedUser.id || '',
    firstName: selectedUser.firstName || '',
    lastName: selectedUser.lastName || '',
    login: selectedUser.login || '',
    password: ''
  }),
  handleSubmit: (values, { setSubmitting, setErrors, resetForm, props }) => {
    const { onSubmit } = props
    onSubmit(values, { setSubmitting, setErrors, resetForm })
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .required('Fill in first name')
      .matches(/^[A-Z]/, 'First name must begin with capitalized letter'),
    lastName: Yup.string()
      .required('Fill in last name')
      .matches(/^[A-Z]/, 'First name must begin with capitalized letter'),
    login: Yup.string()
      .required('Fill in a username'),
    password: Yup.string()
      .matches(/^((?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}|.{0})$/, 'Password should be at least 8 characters and include a special character and a number')
  })
})(EditUserDialog)
