import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar'
import TabDefinition from './Tabs/TabDefinition'
import TabFilters from './Tabs/TabFilters'

const styles = theme => ({
  wrapper: {
    padding: '80px 16px 16px',
    background: theme.palette.default.background
  },
  container: {
    position: 'relative',
    background: theme.palette.default.card,
    border: `1px solid ${theme.palette.default.border}`
  },
  content: {
    height: 'calc(100vh - 147px)',
    overflowY: 'auto'
  },
  tabs: {
    color: theme.palette.default.contrastText,
    borderBottom: `1px solid ${theme.palette.default.border}`
  }
})

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class ButtonConfigDialog extends React.Component {
  state = {
    selectedTab: 'definition'
  }

  changeTab = (e, tab) => {
    this.setState({
      selectedTab: tab
    })
  }

  render () {
    const { selectedTab } = this.state

    const {
      classes,
      isOpen,
      onClose,
      buttonName,
      onButtonNameChange,
      buttonDescription,
      onButtonDescriptionChange,
      buttonImage,
      onButtonImageChange,
      buttonFilters,
      onButtonFilterAdd,
      onButtonFiltersUpdate,
      onButtonFiltersDelete
    } = this.props

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar
          title={`Button Configuration - ${buttonName}`}
          canClose
          onClose={onClose}
          canSearch={false} />

        <div className={classes.wrapper}>
          <Grid container className={classes.container} direction="column">
            <Tabs
              className={classes.tabs}
              value={selectedTab}
              onChange={this.changeTab}>
              <Tab value='definition' label='Definition' />
              <Tab value='filters' label='Filters' />
            </Tabs>

            <div className={classes.content}>
              <div className={classes.tabbar} />
              {selectedTab === 'definition' &&
                <TabDefinition
                  name={buttonName}
                  onNameChange={onButtonNameChange}
                  description={buttonDescription}
                  onDescriptionChange={onButtonDescriptionChange}
                  image={buttonImage}
                  onImageChange={onButtonImageChange} />}

              {selectedTab === 'filters' &&
                <TabFilters
                  filters={buttonFilters}
                  onFilterAdd={onButtonFilterAdd}
                  onFiltersUpdate={onButtonFiltersUpdate}
                  onFiltersDelete={onButtonFiltersDelete} />}
            </div>
          </Grid>
        </div>
      </Dialog >
    )
  }
}

ButtonConfigDialog.propTypes = {
  classes: PropTypes.object,

  isOpen: PropTypes.bool,
  onClose: PropTypes.func,

  buttonName: PropTypes.string,
  onButtonNameChange: PropTypes.func,

  buttonDescription: PropTypes.string,
  onButtonDescriptionChange: PropTypes.func,

  buttonImage: PropTypes.string,
  onButtonImageChange: PropTypes.func,

  buttonFilters: PropTypes.array,
  onButtonFilterAdd: PropTypes.func,
  onButtonFiltersUpdate: PropTypes.func,
  onButtonFiltersDelete: PropTypes.func
}

export default withStyles(styles)(ButtonConfigDialog)
