import React from 'react'
import PropTypes from 'prop-types'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import withStyles from '@material-ui/core/styles/withStyles'
import CloseIcon from '@material-ui/icons/Close'

const styles = () => ({
  media: {
    paddingTop: '56.25%',
    border: '1px solid transparent'
  },
  button: {
    position: 'absolute',
    top: 68,
    right: 24
  }
})

const DragAndDropPreview = ({ classes, image, onDelete }) =>
  <React.Fragment>
    <CardMedia
      className={classes.media}
      image={image} />
    <IconButton
      className={classes.button}
      onClick={onDelete}
      variant="fab"
      aria-label="Delete">
      <CloseIcon />
    </IconButton>
  </React.Fragment>

DragAndDropPreview.propTypes = {
  classes: PropTypes.object,
  image: PropTypes.string,
  onDelete: PropTypes.func
}

export default withStyles(styles)(DragAndDropPreview)
