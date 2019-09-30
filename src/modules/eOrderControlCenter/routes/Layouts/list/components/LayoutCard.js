import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  card: {
    maxWidth: 240,
    marginRight: 16,
    marginBottom: 16
  },
  cardHeaderRoot: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  cardHeaderTitle: {
    fontSize: '1em'
  },
  cardContentRoot: {
    paddingTop: 8,
    paddingBottom: 0,
    paddingLeft: 16,
    paddingRight: 16
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  actions: {
    display: 'flex'
  }
}

class LayoutCard extends React.PureComponent {
  state = {
    anchorEl: null
  }

  constructor (props) {
    super(props)

    this.navigateToDetail = this.navigateToDetail.bind(this)
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  navigateToDetail (layout) {
    const { history } = this.props
    this.setState({ anchorEl: null })
    history.push(`/layouts/detail/${layout && layout.id}`)
  }

  render () {
    const { anchorEl } = this.state
    const { classes, layout } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton
              aria-owns={anchorEl ? 'layout-menu' : null}
              aria-haspopup='true'
              onClick={this.handleClick}
            >
              <Icon>more_vert</Icon>
            </IconButton>
          }
          title='Layout 01'
          classes={{
            root: classes.cardHeaderRoot,
            title: classes.cardHeaderTitle
          }}
        />
        <Menu
          id='layout-menu'
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={this.handleClose}
        >
          <MenuItem onClick={e => this.navigateToDetail(layout)}>Edit layout</MenuItem>
          <MenuItem onClick={this.handleClose}>(De)Activate layout</MenuItem>
          <MenuItem onClick={this.handleClose}>Copy layout</MenuItem>
        </Menu>
        <CardMedia
          className={classes.media}
          image='https://material-ui-next.com/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile'
        />
        <CardContent classes={{
          root: classes.cardContentRoot
        }}>
          <Typography component='p'>
            Layout description
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

LayoutCard.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  layout: PropTypes.object
}

export default withRouter(withStyles(styles)(LayoutCard))
