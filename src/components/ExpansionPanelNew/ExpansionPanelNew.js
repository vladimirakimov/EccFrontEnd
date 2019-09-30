import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import PanelSummary from '../ExpansionPanelSummary'
import PanelContent from '../ExpansionPanelContent'

const styles = () => ({
  disabledPanel: {
    pointerEvents: 'none'
  },
  panelDetails: {
    alignItems: 'center'
  },
  disabledIcon: {
    opacity: 0.2
  }
})

class ExpansionPanelNew extends React.PureComponent {
  state = {
    collapsed: false,
    searchQuery: ''
  }

  handleTogglePanel = (e, collapsed) => {
    const { items } = this.props

    if (items.length !== 0) this.setState({ collapsed })
  }

  handleToggleAllItems = () => {
    const {
      items,
      selectedItems,
      onChange
    } = this.props

    this.setState({ collapsed: false })

    const data = items.length === selectedItems.length ? [] : items

    onChange(data)
  }

  handleItemClick = item => {
    const { items, selectedItems, onChange } = this.props
    const actualItems = selectedItems

    if (selectedItems.length && items.length - 1 === selectedItems.length) {
      this.setState({ collapsed: false })
    }

    actualItems.push(item)
    onChange(actualItems)
  }

  handleItemDelete = id => {
    const { selectedItems, onChange } = this.props
    const items = selectedItems.filter(i => i.id !== id)

    onChange(items)
  }

  handleSearchChange = searchQuery => {
    this.setState({ searchQuery })
  }

  render () {
    const {
      collapsed,
      searchQuery
    } = this.state

    const {
      classes,
      icon,
      title,
      items,
      selectedItems
    } = this.props

    const selectedItemsIds = selectedItems.map(i => i.id)
    const availableItems = items.filter(i => !selectedItemsIds.includes(i.id))
    const allItemsSelected = items.length > 0 && items.length === selectedItems.length
    const thereAreNoItems = items.length === 0

    return (
      <ExpansionPanel
        onChange={this.handleTogglePanel}
        className={allItemsSelected ? classes.disabledPanel : null}
        expanded={collapsed}>

        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={allItemsSelected ? classes.disabledIcon : null} />}>
          <PanelSummary
            icon={icon}
            title={title}
            collapsed={collapsed}
            selectedItems={selectedItems}
            allItemsSelected={allItemsSelected}
            thereAreNoItems={thereAreNoItems}
            onToggleAll={this.handleToggleAllItems} />
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.panelDetails}>
          {!allItemsSelected && collapsed &&
          <Fade in={collapsed} timeout={{ enter: 500 }}>
            <PanelContent
              searchQuery={searchQuery}
              selectedItems={selectedItems}
              availableItems={availableItems}
              onItemClick={this.handleItemClick}
              onItemDelete={this.handleItemDelete}
              onSearchChange={this.handleSearchChange} />
          </Fade>
          }
        </ExpansionPanelDetails>

      </ExpansionPanel>
    )
  }
}

ExpansionPanelNew.propTypes = {
  classes: PropTypes.object,
  icon: PropTypes.node,
  title: PropTypes.string,
  items: PropTypes.any,
  selectedItems: PropTypes.any,
  onChange: PropTypes.func
}

export default withStyles(styles)(ExpansionPanelNew)
