import React from 'react'
import ReactDropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import UploadIcon from '@material-ui/icons/SaveAlt'

import Preview from '../DragAndDropPreview'

const styles = () => ({
  container: {
    position: 'relative',
    paddingTop: '56.25%',
    border: `1px dashed #949494`,
    borderRadius: '3px',
    boxSizing: 'border-box'
  },
  isActive: {
    borderColor: '#db0f16',
    backgroundColor: 'rgb(255, 229, 226)'
  },
  dropArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  informer: {
    textAlign: 'center',
    lineHeight: '30px',
    fontSize: 12,
    color: '#949494'
  },
  input: {
    display: 'none'
  },
  button: {
    marginLeft: 8
  },
  icon: {
    fontSize: 48
  }
})

class DragAndDrop extends React.PureComponent {
  handleDrop = acceptedFiles => {
    const { onUpload } = this.props
    const file = acceptedFiles[0]
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)
    fileReader.onloadend = () => {
      onUpload(fileReader.result)
    }
  }

  handleChange = event => {
    const { onUpload } = this.props
    const file = event.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)
    fileReader.onloadend = () => {
      onUpload(fileReader.result)
    }
  }

  render () {
    const { classes, onDeleteClick, image } = this.props

    return (
      <React.Fragment>
        {!image &&
          <ReactDropzone
            onDrop={this.handleDrop}
            className={classes.container}
            activeClassName={classes.isActive}
            disableClick>
            <div className={classes.dropArea}>
              <UploadIcon className={classes.icon} color='disabled' />
              <p className={classes.informer}>
                Drop or
                <input
                  onChange={this.handleChange}
                  accept="image/*"
                  className={classes.input}
                  id="uploadTeamPhotoInput"
                  multiple
                  type="file"
                />
                <label htmlFor="uploadTeamPhotoInput">
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    component="span"
                    className={classes.button}>
                    Upload
                  </Button>
                </label>
                <br />
                the image
              </p>
            </div>
          </ReactDropzone>
        }

        {image &&
          <Preview image={image} onDelete={onDeleteClick} />
        }
      </React.Fragment>
    )
  }
}

DragAndDrop.propTypes = {
  classes: PropTypes.object,
  onUpload: PropTypes.func,
  onDeleteClick: PropTypes.func,
  image: PropTypes.string
}

export default withStyles(styles)(DragAndDrop)
