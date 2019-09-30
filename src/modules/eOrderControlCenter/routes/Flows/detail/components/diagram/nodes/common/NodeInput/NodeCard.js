import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DescriptionIcon from '@material-ui/icons/Description'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  cardRoot: {
    width: 320,
    overflow: 'visible'
  },
  freeActionCard: {
    background: '#AED581'
  },
  freeActionAvatar: {
    background: '#689F38'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

class NodeCard extends React.Component {
  render () {
    const {
      classes,
      title,
      onNameChange,
      node
    } = this.props
    console.log(node)
    return (
      <Card className={classNames(classes.cardRoot, { [classes.freeActionCard]: node.freeAction })}>
        <CardHeader
          avatar={
            <Avatar className={node.freeAction ? classes.freeActionAvatar : null}>
              <DescriptionIcon />
            </Avatar>
          }
          action={
            <IconButton className={classes.actionButton}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <TextField
              value={title}
              onChange={onNameChange} />}
          subheader='Input'
        />
        <CardActions>
          <Button size="small" color={node.freeAction ? 'default' : 'primary'}>
            <VisibilityIcon className={classes.leftIcon} /> Show Preview
          </Button>
        </CardActions>
      </Card>
    )
  }
}

NodeCard.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  onNameChange: PropTypes.func,
  node: PropTypes.any
}

export default withStyles(styles)(NodeCard)
