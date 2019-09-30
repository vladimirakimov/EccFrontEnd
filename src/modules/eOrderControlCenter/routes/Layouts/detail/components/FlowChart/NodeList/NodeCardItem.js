import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import SvgIcon from '@material-ui/core/SvgIcon'
import { withStyles } from '@material-ui/core/styles'

import { getIcons } from '~/modules/eOrderControlCenter/redux/Icon/icon.selector'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2
  }
})

class NodeCardItem extends React.PureComponent {
  render () {
    const { classes, tab, icons, onClick, onDelete } = this.props
    const currentIcon = icons.filter(x => x.id === tab.icon)[0]
    const iconPath = currentIcon && currentIcon.dataPath

    return (
      <Chip
        avatar={
          iconPath && <Avatar>
            <SvgIcon>
              <path d={iconPath} />
            </SvgIcon>
          </Avatar>
        }
        label={tab.name}
        className={classes.chip}
        onClick={onClick}
        onDelete={onDelete}
      />
    )
  }
}

NodeCardItem.propTypes = {
  classes: PropTypes.object,
  tab: PropTypes.any,
  icons: PropTypes.array,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
}

const mapStateToProps = (state) => ({
  icons: getIcons(state)
})

export default withStyles(styles)(connect(mapStateToProps)(NodeCardItem))
