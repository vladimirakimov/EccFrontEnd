import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import Yup from 'yup'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { getUsersErrors } from '../../../redux/User/user.selector'

class CreateUserDialog extends React.PureComponent {
  handleClose = () => {
    const {
      resetForm,
      onClose
    } = this.props
    resetForm()
    onClose()
  }

  componentDidMount = () => this.props.resetForm()

  componentDidUpdate = prevProps => {
    const {
      open,
      errors,
      usersErrors,
      resetForm,
      setFieldError
    } = this.props

    const formErrorsDifference = Object.keys(prevProps.errors).length !== Object.keys(errors).length
    const userErrorsDifference = prevProps.usersErrors.length !== usersErrors.length

    if (formErrorsDifference || userErrorsDifference) {
      usersErrors.forEach(error => setFieldError(error.target, error.message))
    }

    if (prevProps.open && !open) resetForm()
  }

  render () {
    const {
      open,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit
    } = this.props

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'>

        <form onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>Create Operator</DialogTitle>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <FormControl error={!!touched.firstName && !!errors.firstName} margin='dense' fullWidth>
                  <InputLabel htmlFor='firstName'>First Name</InputLabel>
                  <Input autoFocus id='firstName' value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
                  {touched.firstName && errors.firstName && <FormHelperText id='firstName-error-text'>{errors.firstName}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl error={!!touched.lastName && !!errors.lastName} margin='dense' fullWidth>
                  <InputLabel htmlFor='lastName'>Last Name</InputLabel>
                  <Input id='lastName' value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
                  {touched.lastName && errors.lastName && <FormHelperText id='lastName-error-text'>{errors.lastName}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl error={!!touched.login && !!errors.login} margin='dense' fullWidth>
                  <InputLabel htmlFor='login'>Username</InputLabel>
                  <Input id='login' value={values.login} onChange={handleChange} onBlur={handleBlur} />
                  {touched.login && errors.login && <FormHelperText id='login-error-text'>{errors.login}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl error={!!touched.password && !!errors.password} margin='dense' fullWidth>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input type='password' id='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                  {touched.password && errors.password && <FormHelperText id='password-error-text'>{errors.password}</FormHelperText>}
                </FormControl>
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

CreateUserDialog.propTypes = {
  open: PropTypes.bool,
  selectedUser: PropTypes.object,
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

  setFieldError: PropTypes.func,
  usersErrors: PropTypes.array,
  hideCreateModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  usersErrors: getUsersErrors(state)
})

function trimData (values) {
  return {
    ...values,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim()
  }
}

export default withFormik({
  mapPropsToValues: props => ({ firstName: '', lastName: '', login: '', password: '' }),
  handleSubmit: (values, { setSubmitting, setErrors, setFieldError, resetForm, props }) => {
    const { onSubmit } = props
    onSubmit(trimData(values), { setSubmitting, setErrors, setFieldError, resetForm })
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
      .required('Fill in a password')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, 'Password should be at least 8 characters and include a special character and a number')
  })
})(connect(mapStateToProps)(CreateUserDialog))
