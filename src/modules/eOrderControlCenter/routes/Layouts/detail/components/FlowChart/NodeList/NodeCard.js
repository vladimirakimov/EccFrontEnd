import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import ListIcon from '@material-ui/icons/List'

import NodeCardItem from './NodeCardItem'

const styles = () => ({
  cardRoot: {
    overflow: 'visible'
  }
})

class NodeCard extends React.Component {
  render () {
    const {
      classes,
      isSelected,
      title,
      subheader,
      node,
      onTabClick,
      onButtonDelete,
      onAddButtonClick,
      onNameChange
    } = this.props

    const tabs = node.tabs.map(tab =>
      <NodeCardItem
        key={tab.id}
        tab={tab}
        onClick={() => onTabClick(tab)}
        onDelete={() => onButtonDelete(tab)} />)

    return (
      <Card raised={isSelected} style={{
        maxWidth: 350
      }}>
        <CardHeader
          avatar={<Avatar><ListIcon /></Avatar>}
          title={
            <TextField
              value={title}
              onChange={onNameChange}/>
          }
          subheader={subheader} />
        <CardContent className={classes.chipRoot}>
          {tabs}
        </CardContent>
        <CardActions>
          <Button onClick={onAddButtonClick} variant='flat' color='primary'>Add Tab</Button>
        </CardActions>
      </Card>
    )
  }
}

NodeCard.propTypes = {
  classes: PropTypes.object,

  isSelected: PropTypes.bool,

  title: PropTypes.string,
  subheader: PropTypes.string,

  node: PropTypes.any,

  onTabClick: PropTypes.func,
  onButtonDelete: PropTypes.func,
  onAddButtonClick: PropTypes.func,
  onNameChange: PropTypes.func
}

export default withStyles(styles)(NodeCard)
