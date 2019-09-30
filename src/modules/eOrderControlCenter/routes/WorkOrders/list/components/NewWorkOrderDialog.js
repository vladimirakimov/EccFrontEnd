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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { ACTIONS as DATA_ACTIONS_OPERATIONS } from '../../../../redux/Operation/operation.actions'
import { getSites, getCustomers } from '../../../../redux/ConfigurationData/configurationData.selector'
import { getOperations } from '../../../../redux/Operation/operation.selector'

class NewWorkOrderDialog extends React.PureComponent {
  componentDidMount () {
    const { getOperations } = this.props
    getOperations()
  }

  handleClose = () => {
    const { resetForm, onClose } = this.props

    resetForm()
    onClose()
  }

  render () {
    const { isOpen, sites, customers, operations, handleSubmit, touched, errors, values, handleChange, handleBlur } = this.props
    const selectedSite = sites && sites.filter(site => site.name === values.site)[0]
    const operationalDepartments = selectedSite && selectedSite.operationalDepartments

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby='new-workorder-dialog-title'
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id='new-workorder-dialog-title'>Create new work order</DialogTitle>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <FormControl error={!!touched.site && !!errors.site} margin='dense' fullWidth>
                  <InputLabel htmlFor='site'>Site</InputLabel>
                  <Select
                    value={values.site}
                    onChange={handleChange}
                    inputProps={{
                      name: 'site',
                      id: 'site'
                    }}
                  >
                    {sites && sites.map((site, i) => <MenuItem key={i} value={site.name}>{site.name}</MenuItem>)}
                  </Select>
                  {touched.site && errors.site && <FormHelperText id='site-error-text'>{errors.site}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl disabled={!selectedSite} error={!!touched.operationalDepartment && !!errors.operationalDepartment} margin='dense' fullWidth>
                  <InputLabel htmlFor='operationalDepartment'>Operational Department</InputLabel>
                  <Select
                    value={values.operationalDepartment}
                    onChange={handleChange}
                    inputProps={{
                      name: 'operationalDepartment',
                      id: 'operationalDepartment'
                    }}
                  >
                    {operationalDepartments && operationalDepartments.map((operationalDepartment, i) => <MenuItem key={i} value={operationalDepartment.name}>{operationalDepartment.name}</MenuItem>)}
                  </Select>
                  {touched.operationalDepartment && errors.operationalDepartment && <FormHelperText id='operationalDepartment-error-text'>{errors.operationalDepartment}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!touched.operation && !!errors.operation} margin='dense' fullWidth>
                <InputLabel htmlFor='operation'>Operation</InputLabel>
                <Select
                  value={values.operation}
                  onChange={handleChange}
                  inputProps={{
                    name: 'operation',
                    id: 'operation'
                  }}
                >
                  {operations && operations.map((operation, i) => <MenuItem key={i} value={operation.name}>{operation.name}</MenuItem>)}
                </Select>
                {touched.operation && errors.operation && <FormHelperText id='operation-error-text'>{errors.operation}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!touched.customer && !!errors.customer} margin='dense' fullWidth>
                <InputLabel htmlFor='customer'>Customer</InputLabel>
                <Select
                  value={values.customer}
                  onChange={handleChange}
                  inputProps={{
                    name: 'customer',
                    id: 'customer'
                  }}
                >
                  {customers && customers.map((customer, i) => <MenuItem key={i} value={customer.name}>{customer.name}</MenuItem>)}
                </Select>
                {touched.customer && errors.customer && <FormHelperText id='customer-error-text'>{errors.customer}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!touched.licensePlateTrailer && !!errors.licensePlateTrailer} margin='dense' fullWidth>
                <InputLabel htmlFor='licensePlateTrailer'>License Plate Trailer</InputLabel>
                <Input id='licensePlateTrailer' value={values.licensePlateTrailer} onChange={handleChange} onBlur={handleBlur} />
                {touched.licensePlateTrailer && errors.licensePlateTrailer && <FormHelperText id='licensePlateTrailer-error-text'>{errors.licensePlateTrailer}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!touched.licensePlateTruck && !!errors.licensePlateTruck} margin='dense' fullWidth>
                <InputLabel htmlFor='licensePlateTruck'>License Plate Truck</InputLabel>
                <Input id='licensePlateTruck' value={values.licensePlateTruck} onChange={handleChange} onBlur={handleBlur} />
                {touched.licensePlateTruck && errors.licensePlateTruck && <FormHelperText id='licensePlateTruck-error-text'>{errors.licensePlateTruck}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!touched.container && !!errors.container} margin='dense' fullWidth>
                <InputLabel htmlFor='container'>Container</InputLabel>
                <Input id='container' value={values.container} onChange={handleChange} onBlur={handleBlur} />
                {touched.container && errors.container && <FormHelperText id='container-error-text'>{errors.container}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!touched.containerLocation && !!errors.containerLocation} margin='dense' fullWidth>
                <InputLabel htmlFor='containerLocation'>Container Location</InputLabel>
                <Input id='containerLocation' value={values.containerLocation} onChange={handleChange} onBlur={handleBlur} />
                {touched.containerLocation && errors.containerLocation && <FormHelperText id='containerLocation-error-text'>{errors.containerLocation}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!touched.dockingZone && !!errors.dockingZone} margin='dense' fullWidth>
                <InputLabel htmlFor='dockingZone'>Docking Zone</InputLabel>
                <Input id='dockingZone' value={values.dockingZone} onChange={handleChange} onBlur={handleBlur} />
                {touched.dockingZone && errors.dockingZone && <FormHelperText id='dockingZone-error-text'>{errors.dockingZone}</FormHelperText>}
              </FormControl>
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
        </form >
      </Dialog >
    )
  }
}

NewWorkOrderDialog.propTypes = {
  classes: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  sites: PropTypes.array,
  customers: PropTypes.array,
  operations: PropTypes.array,
  getOperations: PropTypes.func,
  resetForm: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
}

const mapStateToProps = (state) => ({
  sites: getSites(state),
  customers: getCustomers(state),
  operations: getOperations(state)
})

const mapDispatchToProps = (dispatch) => ({
  getOperations: () => dispatch(DATA_ACTIONS_OPERATIONS.getList())
})

export default withFormik({
  mapPropsToValues: props => ({ site: '', operationalDepartment: '', operation: '', customer: '', licensePlateTrailer: '', licensePlateTruck: '', container: '', containerLocation: '', dockingZone: '' }),
  handleSubmit: (values, { setSubmitting, setErrors, resetForm, props }) => {
    const { onSubmit } = props
    onSubmit(values, { setSubmitting, setErrors, resetForm })
  },
  validationSchema: Yup.object().shape({
    site: Yup.string().required('Select a site'),
    operation: Yup.string().required('Select an operation')
  })
})(connect(mapStateToProps, mapDispatchToProps)(NewWorkOrderDialog))
