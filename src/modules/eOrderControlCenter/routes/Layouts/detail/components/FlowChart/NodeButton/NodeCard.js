import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import DnsIcon from '@material-ui/icons/Dns'

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
      ports,
      onButtonClick,
      onButtonDelete,
      onAddButtonClick,
      onNameChange
    } = this.props

    return (
      <React.Fragment>
        <Card
          raised={isSelected}
          style={{ maxWidth: 350 }}
          classes={{ root: classes.cardRoot }}>
          <CardHeader
            avatar={<Avatar><DnsIcon /></Avatar>}
            title={
              <TextField
                value={title}
                onChange={onNameChange} />}
            subheader={subheader} />
          <Grid container direction='column'>
            {ports.map(port =>
              <Grid key={port.name} item>
                <NodeCardItem
                  port={port}
                  node={node}
                  onClick={() => onButtonClick(port)}
                  onDelete={() => onButtonDelete(port)} />
              </Grid>
            )}
          </Grid>
          <CardActions>
            <Button
              variant='flat'
              color='primary'
              onClick={onAddButtonClick}>
              Add Button
            </Button>
          </CardActions>
        </Card>
      </React.Fragment>
    )
  }
}

NodeCard.propTypes = {
  classes: PropTypes.object,

  isSelected: PropTypes.bool,

  title: PropTypes.string,
  subheader: PropTypes.string,

  node: PropTypes.any,
  ports: PropTypes.array,

  onButtonClick: PropTypes.func,
  onButtonDelete: PropTypes.func,
  onAddButtonClick: PropTypes.func,
  onNameChange: PropTypes.func
}

export default withStyles(styles)(NodeCard)
