import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(18)
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    flexBasis: '100%'
  },
  chip: {
    margin: 4
  },
  switch: {
    pointerEvents: 'auto',
    marginRight: 0,
    marginLeft: 'auto'
  },
  switchInput: {
    pointerEvents: 'none'
  },
  divider: {
    margin: '12px 16px 12px 0'
  },
  panelSummary: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    boxShadow: 'none'
  },
  icon: {
    marginRight: 16
  },
  avatar: {
    width: 'auto',
    padding: '0 16px',
    borderRadius: 25
  },
  disabled: {
    opacity: '0.3'
  }
})

class PanelSummary extends React.PureComponent {
  render () {
    const {
      classes,
      collapsed,
      icon,
      title,
      selectedItems,
      allItemsSelected,
      thereAreNoItems,
      onToggleAll
    } = this.props

    return (
      <div className={classes.panelSummary}>
        <div className={classes.column}>

          <span className={classNames(classes.icon, { [classes.disabled]: thereAreNoItems })}>
            {icon}
          </span>

          <div className={thereAreNoItems ? classes.disabled : undefined}>
            <Typography className={classes.heading}>{title}</Typography>
            <Typography variant="caption">
              {!thereAreNoItems
                ? !allItemsSelected
                  ? `Items selected: ${selectedItems.length}`
                  : 'All items selected'
                : 'There are no items'
              }
            </Typography>
          </div>

          <FormControlLabel
            control={
              <Switch
                className={classes.switchInput}
                checked={allItemsSelected}
                onChange={onToggleAll}
                disabled={thereAreNoItems}
                value="checkedA"
              />
            }
            className={classes.switch}
            labelPlacement="start"
            label="Add all" />
        </div>

        {!collapsed && selectedItems.length !== 0 && !allItemsSelected &&
          <Fade in={!collapsed} timeout={{ enter: 500 }}>
            <Paper elevation={4} className={classes.paper}>
              <Divider className={classes.divider} />

              <div>
                {selectedItems.map((s, i) =>
                  <Chip
                    key={i}
                    avatar={<Avatar className={classes.avatar}>{s.name}</Avatar>}
                    label={s.description}
                    className={classes.chip}/>
                )}
              </div>
            </Paper>
          </Fade>
        }
      </div>
    )
  }
}

PanelSummary.propTypes = {
  classes: PropTypes.object,
  collapsed: PropTypes.bool,
  icon: PropTypes.node,
  title: PropTypes.string,
  items: PropTypes.any,
  selectedItems: PropTypes.any,
  allItemsSelected: PropTypes.bool,
  thereAreNoItems: PropTypes.bool,
  onToggleAll: PropTypes.func
}

export default withStyles(styles)(PanelSummary)
