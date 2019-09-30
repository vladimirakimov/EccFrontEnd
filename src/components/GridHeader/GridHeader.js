import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import GridHeaderOverlay from '../GridHeaderOverlay'

const styles = theme => ({
  root: {
    position: 'relative',
    padding: 16,
    border: 0,
    boxShadow: 'none'
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  },
  button: {
    marginRight: 16
  }
})

const GridHeader = ({ classes, title, numSelected, recordsCount, showAddButton, onAdd, onDelete }) =>
  <Paper className={classes.root} elevation={1}>
    <Grid item xs={12} sm container>
      <Grid item xs container direction="column">
        <Typography variant="h6" gutterBottom>
          { title }
        </Typography>

        <Typography className={classes.recordsCount} variant="caption" gutterBottom>
          {recordsCount > 0 ? `Total: ${recordsCount} records` : 'There are no records' }
        </Typography>
      </Grid>
      <Grid item>
        {showAddButton &&
          <Button
            onClick={onAdd}
            variant="contained"
            color="primary"
            className={classes.button}>
            Add
          </Button>}

        <IconButton aria-label="Delete">
          <MoreVertIcon />
        </IconButton>
      </Grid>
    </Grid>

    {numSelected > 0 && <GridHeaderOverlay numSelected={numSelected} onDelete={onDelete} />}
  </Paper>

GridHeader.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  recordsCount: PropTypes.number,
  numSelected: PropTypes.number,
  showAddButton: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func
}

export default withStyles(styles)(GridHeader)
