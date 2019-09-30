import React from 'react'
import EventListener from 'react-event-listener'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: 2,
    background: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.black, 0.25)
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 200,
      '&:focus': {
        width: 250
      }
    }
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0,
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0
    }
  }
})

class SearchField extends React.PureComponent {
  handleKeydown = event => {
    if (
      event.key === 'f' &&
      event.ctrlKey &&
      document.activeElement.nodeName.toLowerCase() === 'body' &&
      document.activeElement !== this.input
    ) {
      event.preventDefault()
      this.input.focus()
    }

    if (event.key.toLowerCase() === 'escape' && document.activeElement === this.input) {
      this.input.blur()
    }
  }

  input = null

  render () {
    const { classes, onChange } = this.props

    return (
      <div className={classes.root}>
        <EventListener target='window' onKeyDown={this.handleKeydown} />
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <input
          onChange={e => onChange(e.target.value)}
          id='teamsearch-input'
          ref={node => {
            this.input = node
          }}
          className={classes.input}
        />
      </div>
    )
  }
}

SearchField.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  onChange: PropTypes.func
}

export default withStyles(styles)(SearchField)
