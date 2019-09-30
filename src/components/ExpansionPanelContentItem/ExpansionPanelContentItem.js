import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class ItemRenderer extends React.PureComponent {
  render () {
    const { data, index, itemClicked } = this.props
    const item = data[index]

    return (
      <ListItem
        style={this.props.style}
        onClick={() => itemClicked(item)}
        button>
        <ListItemText
          primary={item.name}
          secondary={item.description} />
      </ListItem>
    )
  }
}

ItemRenderer.propTypes = {
  index: PropTypes.number,
  style: PropTypes.any,
  data: PropTypes.array,
  itemClicked: PropTypes.func
}

export default ItemRenderer
