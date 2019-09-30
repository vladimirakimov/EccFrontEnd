import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SvgIcon from '@material-ui/core/SvgIcon'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import { getIcons } from '~/modules/eOrderControlCenter/redux/Icon/icon.selector'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  iconPreview: {
    marginRight: theme.spacing.unit
  }
})

class TabDefinitionTab extends React.PureComponent {
  render () {
    const {
      classes,
      name,
      onNameChange,
      description,
      onDescriptionChange,
      icons,
      icon,
      onIconChange
    } = this.props
    const currentIcon = icons.filter(x => x.id === icon)[0]
    const iconPath = currentIcon && currentIcon.dataPath

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
                <SvgIcon style={{
                  width: 256,
                  height: 256
                }}>
                  <path d={iconPath} />
                </SvgIcon>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='icon'>Icon</InputLabel>
                  <Select value={icon} onChange={onIconChange}>
                    <MenuItem value=''><em>None</em></MenuItem>
                    {icons.map(icon =>
                      <MenuItem key={icon.id} value={icon.id}>
                        <SvgIcon className={classes.iconPreview}>
                          <path d={icon.dataPath} />
                        </SvgIcon>
                        {icon.name}
                      </MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

TabDefinitionTab.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  onNameChange: PropTypes.func,
  description: PropTypes.string,
  onDescriptionChange: PropTypes.func,
  icons: PropTypes.array,
  icon: PropTypes.any,
  onIconChange: PropTypes.func
}

const mapStateToProps = (state) => ({
  icons: getIcons(state)
})

export default withStyles(styles)(connect(mapStateToProps)(TabDefinitionTab))
