import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

class TeamGeneralTab extends React.PureComponent {
  handleLayoutChange = event => {
    const { setFieldValue } = this.props
    const layoutId = event.target.value

    setFieldValue('layout', layoutId)
  }

  handleImageChange = event => {
    const { setFieldValue } = this.props
    const file = event.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)
    fileReader.onloadend = e => {
      setFieldValue('image', fileReader.result)
    }
  }

  render () {
    const {
      classes,
      values,
      handleChange,
      handleBlur,
      layouts
    } = this.props

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id='name'
                  label='Name'
                  color='secondary'
                  margin='normal'
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='description'
                  label='Description'
                  multiline
                  rows='4'
                  margin='normal'
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </Grid>
              <Grid item xs={12} container direction='column'>
                <InputLabel shrink htmlFor="layout-label-placeholder">Layout</InputLabel>
                <Select
                  placeholder='Select Layout'
                  value={values.layout ? values.layout : ' '}
                  onChange={this.handleLayoutChange}
                  input={<Input name="layout" id="layout-label-placeholder" />}>
                  <MenuItem value=" "><em>None</em></MenuItem>
                  {layouts.map(l =>
                    <MenuItem key={l.id} value={l.id}>
                      {l.name}
                    </MenuItem>)}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container direction='column'>
              <Grid item>
                <img src={values.image} width='256' />
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="flat-button-file"
                  multiple
                  type="file"
                  onChange={this.handleImageChange}
                />
                <label htmlFor="flat-button-file">
                  <Button variant='contained' color='primary' component="span" className={classes.button}>
                    Select Image
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

TeamGeneralTab.propTypes = {
  classes: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  setFieldValue: PropTypes.func,
  layouts: PropTypes.array,
  selectedLayouts: PropTypes.any,
  onSelectedLayoutsChange: PropTypes.any
}

export default withStyles(styles)(TeamGeneralTab)
