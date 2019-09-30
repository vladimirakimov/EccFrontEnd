import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import InputBase from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { FixedSizeList as ListWindow } from 'react-window'

import ListWindowItem from '../ExpansionPanelContentItem'

const styles = theme => ({
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexBasis: '75%',
    justifyContent: 'center'
  },
  listContainer: {
    padding: 0,
    flexBasis: '25%'
  },
  list: {
    maxHeight: 300,
    width: '100%',
    padding: 0,
    overflow: 'auto'
  },
  chip: {
    margin: 4
  },
  search: {
    position: 'relative',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%'
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  avatar: {
    width: 'auto',
    padding: '0 16px',
    borderRadius: 25
  }
})

class PanelContent extends React.PureComponent {
  filterItems = () => {
    const { availableItems, searchQuery } = this.props

    if (searchQuery === undefined || searchQuery === null || searchQuery === '') return availableItems

    const filterWords = searchQuery.split(' ')
    return availableItems.filter(item => {
      return filterWords.every(word => {
        if (item.name && item.description) {
          return item.name.toLowerCase().indexOf(word.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(word.toLowerCase()) > -1
        }
      })
    })
  }

  render () {
    const {
      classes,
      searchQuery,
      selectedItems,
      onItemClick,
      onItemDelete,
      onSearchChange
    } = this.props

    const items = this.filterItems()

    return (
      <React.Fragment>
        <div className={classes.chipsContainer}>
          {selectedItems.length !== 0 &&
            selectedItems.map(s =>
              <Chip
                avatar={<Avatar className={classes.avatar}>{s.name}</Avatar>}
                key={s.id}
                label={s.description}
                className={classes.chip}
                onDelete={() => onItemDelete(s.id)} />
            )}

          {selectedItems.length === 0 &&
            <Typography>Select sources from the list</Typography>}
        </div>

        <div className={classNames(classes.listContainer, classes.helper)}>
          <div className={classes.search}>
            <InputBase
              value={searchQuery}
              onChange={event => onSearchChange(event.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <ListWindow
            itemData={items}
            itemCount={items.length}
            height={300}
            itemSize={71}
            onItemClick={this.handleItemClick} >
            {({ data, index, style }) => (
              <ListWindowItem
                data={data}
                index={index}
                style={style}
                itemClicked={onItemClick} />
            )}
          </ListWindow>
        </div>
      </React.Fragment>
    )
  }
}

PanelContent.propTypes = {
  classes: PropTypes.object,
  searchQuery: PropTypes.string,
  selectedItems: PropTypes.array,
  availableItems: PropTypes.array,
  onItemClick: PropTypes.func,
  onItemDelete: PropTypes.func,
  onSearchChange: PropTypes.func
}

export default withStyles(styles)(PanelContent)
