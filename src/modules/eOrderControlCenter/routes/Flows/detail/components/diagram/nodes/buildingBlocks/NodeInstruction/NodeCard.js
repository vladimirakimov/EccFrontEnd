import React from 'react'
import PropTypes from 'prop-types'
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

    return (
      <Card className={classes.cardRoot}>
        <CardHeader
          avatar={
            <Avatar>
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
          subheader='Instruction'
        />
        <CardActions>
          <Button size="small" color="primary">
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
