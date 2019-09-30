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
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import DragAndDrop from '~/components/DragAndDrop'
import { getLayoutsErrors } from '../../../../redux/Layout/layout.selector'

class CreateDialog extends React.PureComponent {
  handleUpload = image => {
    const { setFieldValue } = this.props

    setFieldValue('image', image)
  }

  handleImageDelete = () => {
    const { setFieldValue } = this.props

    setFieldValue('image', '')
  }

  handleClose = () => {
    const {
      resetForm,
      onClose
    } = this.props

    resetForm()
    onClose()
  }

  componentDidUpdate = prevProps => {
    const {
      isOpen,
      errors,
      layoutErrors,
      resetForm,
      setFieldError
    } = this.props

    const formErrorsDifference = Object.keys(prevProps.errors).length !== Object.keys(errors).length
    const userErrorsDifference = prevProps.layoutErrors.length !== layoutErrors.length

    if (formErrorsDifference || userErrorsDifference) {
      layoutErrors.forEach(error => setFieldError(error.target, error.message))
    }

    if (prevProps.isOpen && !isOpen) resetForm()
  }

  render () {
    const {
      isOpen,
      values,
      touched,
      errors,
      handleSubmit,
      handleChange,
      handleBlur
    } = this.props

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby='new-layout-dialog'
        maxWidth='xs'>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create new layout</DialogTitle>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <DragAndDrop
                  image={values.image}
                  onUpload={this.handleUpload}
                  onDeleteClick={this.handleImageDelete} />
              </Grid>
              <Grid item xs={12}>
                <FormControl error={!!touched.name && !!errors.name} margin='dense' fullWidth>
                  <TextField
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    label="Name *"
                    placeholder="Enter team name"
                    error={!!touched.name && !!errors.name} />
                  {touched.name && errors.name &&
                    <FormHelperText id='site-error-text'>{errors.name}</FormHelperText>
                  }
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin='dense' fullWidth>
                  <TextField
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="description"
                    label="Description"
                    placeholder="Enter team descritption"
                    multiline />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type='submit' color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

CreateDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,

  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  setFieldValue: PropTypes.func,
  setFieldError: PropTypes.func,
  layoutErrors: PropTypes.array
}

const mapStateToProps = (state) => ({
  layoutErrors: getLayoutsErrors(state)
})

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    description: '',
    image: ''
  }),
  handleSubmit: (values, { setSubmitting, setErrors, resetForm, props }) => {
    const { onSubmit } = props
    onSubmit(values, { setSubmitting, setErrors, resetForm })
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('Enter the name of layout')
  })
})(connect(mapStateToProps)(CreateDialog))
