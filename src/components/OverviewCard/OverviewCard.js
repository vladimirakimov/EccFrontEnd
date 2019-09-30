import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  card: {
    position: 'relative',
    margin: theme.spacing.unit,
    height: 288,
    cursor: 'pointer',
    '& .deleteButton': {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 1,
      opacity: 0,
      transition: '0.2s ease-in'
    },
    '&:hover .deleteButton': {
      opacity: 1
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  description: {
    paddingTop: theme.spacing.unit
  }
})

class OverviewCard extends React.PureComponent {
  state = {
    hovered: false
  }

  handleMouseOver = () => {
    this.setState({ hovered: true })
  }

  handleMouseOut = () => {
    this.setState({ hovered: false })
  }

  render () {
    const {
      classes,
      title,
      subTitle,
      content,
      mediaTitle,
      mediaImage,
      onDetailClicked,
      onDeleteClicked
    } = this.props

    const { hovered } = this.state

    return (
      <Card
        className={classes.card}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        raised={hovered}>
        <Button
          onClick={onDeleteClicked}
          variant="contained"
          size="small"
          color="primary"
          className={'deleteButton'}>
          Delete
        </Button>
        <CardMedia
          onClick={onDetailClicked}
          className={classes.media}
          image={mediaImage}
          title={mediaTitle} />
        <CardContent
          onClick={onDetailClicked}
          style={{ paddingLeft: 16, paddingRight: 16 }}>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='body2' color='textSecondary' gutterBottom>{subTitle}</Typography>
          <Typography component='p' className={classes.description}>{content}</Typography>
        </CardContent>
      </Card>
    )
  }
}

OverviewCard.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.node,
  content: PropTypes.string,
  mediaTitle: PropTypes.string,
  mediaImage: PropTypes.string,
  onDetailClicked: PropTypes.func,
  onDeleteClicked: PropTypes.func
}

export default withStyles(styles)(OverviewCard)
