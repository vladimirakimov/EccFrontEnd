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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  input: {
    display: 'none'
  }
})

class ButtonDefinitionTab extends React.PureComponent {
  render () {
    const {
      classes,
      name,
      onNameChange,
      description,
      onDescriptionChange,
      image,
      onImageChange
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
                  value={name}
                  onChange={onNameChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='description'
                  label='Description'
                  multiline
                  rows={4}
                  margin='normal'
                  value={description}
                  onChange={onDescriptionChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container direction='column'>
              <Grid item>
                <img src={image} width='256' />
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="flat-button-file"
                  multiple
                  type="file"
                  onChange={onImageChange}
                />
                <label htmlFor="flat-button-file">
                  <Button variant='raised' color='primary' component="span" className={classes.button}>
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

ButtonDefinitionTab.propTypes = {
  classes: PropTypes.object,

  name: PropTypes.string,
  onNameChange: PropTypes.func,

  description: PropTypes.string,
  onDescriptionChange: PropTypes.func,

  image: PropTypes.string,
  onImageChange: PropTypes.func
}

export default withStyles(styles)(ButtonDefinitionTab)
