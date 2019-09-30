import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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

class FlowGeneralTab extends React.PureComponent {
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
      handleBlur
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

FlowGeneralTab.propTypes = {
  classes: PropTypes.object,
  values: PropTypes.any,
  errors: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  setFieldValue: PropTypes.func
}

export default withStyles(styles)(FlowGeneralTab)
