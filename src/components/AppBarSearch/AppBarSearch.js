import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'

const styles = theme => ({
  searchBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    backgroundColor: theme.palette.default.main,
    zIndex: 1
  },
  searchInput: {
    fontSize: '1.5rem',
    '&:before,&:after': { display: 'none' }
  }
})

class AppBarSearch extends React.PureComponent {
  state = {
    isOpen: false
  }

  handleSearch = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  render () {
    const { classes, onChange } = this.props
    const { isOpen } = this.state

    return (
      <React.Fragment>
        <IconButton onClick={this.handleSearch} color="inherit">
          <Search />
        </IconButton>

        {isOpen &&
          <div className={classes.searchBar}>
            <Input
              onChange={e => onChange(e.target.value)}
              className={classes.searchInput}
              placeholder="Search"
              autoFocus />

            <IconButton onClick={this.handleClose} color="inherit">
              <Close />
            </IconButton>
          </div>
        }
      </React.Fragment>
    )
  }
}

AppBarSearch.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func
}

export default withStyles(styles)(AppBarSearch)
