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
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import DragAndDrop from '~/components/DragAndDrop'
import { ACTIONS as DATA_ACTIONS } from '~/modules/eOrderControlCenter/redux/Layout/layout.actions'
import { getLayouts } from '~/modules/eOrderControlCenter/redux/Layout/layout.selector'

class CreateDialog extends React.PureComponent {
  componentDidMount () {
    const { getLayouts } = this.props
    getLayouts()
  }

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

  render () {
    const {
      isOpen,
      values,
      touched,
      errors,
      handleSubmit,
      handleChange,
      handleBlur,
      layouts
    } = this.props

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby='new-team-dialog'
        maxWidth='xs'>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create new team</DialogTitle>
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
                    placeholder="Enter team name" />
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
              <Grid item xs={12}>
                <FormControl margin='dense' fullWidth>
                  <InputLabel htmlFor="layout">Layout</InputLabel>
                  <Select
                    value={values.layout}
                    onChange={handleChange}
                    input={<Input name="layout" id="layout" />} >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {layouts.map(l =>
                      <MenuItem key={l.id} value={l.id}>
                        {l.name}
                      </MenuItem>)
                    }
                  </Select>
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

  layouts: PropTypes.array,
  getLayouts: PropTypes.func,

  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  setFieldValue: PropTypes.func
}

const mapStateToProps = (state) => ({
  layouts: getLayouts(state)
})

const mapDispatchToProps = (dispatch) => ({
  getLayouts: () => dispatch(DATA_ACTIONS.getList())
})

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    description: '',
    layout: '',
    image: '',
    driverWaits: 'yes'
  }),
  handleSubmit: (values, { setSubmitting, setErrors, resetForm, props }) => {
    const { onSubmit } = props
    onSubmit(values, { setSubmitting, setErrors, resetForm })
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('Enter the name of team')
  })
})(connect(mapStateToProps, mapDispatchToProps)(CreateDialog))
