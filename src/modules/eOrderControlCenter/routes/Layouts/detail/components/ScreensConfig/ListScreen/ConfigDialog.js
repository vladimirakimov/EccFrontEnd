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
import TabWorkOrderButtons from './Tabs/TabWorkOrderButtons'

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

class ConfigDialog extends React.PureComponent {
  state = {
    selectedTab: 'definition'
  }

  changeTab = (e, tab) => {
    this.setState({
      selectedTab: tab
    })
  }

  render () {
    const {
      classes,
      isOpen,
      onClose,
      tabName,
      onTabNameChange,
      tabDescription,
      onTabDescriptionChange,
      tabIcon,
      onTabIconChange,
      tabFilters,
      onTabFilterAdd,
      onTabFiltersUpdate,
      onTabFiltersDelete,
      tabWorkOrderButtons,
      onTabButtonAdd,
      onTabButtonUpdate,
      onTabButtonsDelete,
      tabShowOperationIcon,
      onTabShowOperationIconChange
    } = this.props
    const { selectedTab } = this.state

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}>

        <AppBar
          title={`Tab Configuration - ${tabName}`}
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
              <Tab value='workOrderButtons' label='Work Order Buttons' />
            </Tabs>

            <div className={classes.content}>
              {selectedTab === 'definition' &&
                <TabDefinition
                  name={tabName}
                  onNameChange={onTabNameChange}
                  description={tabDescription}
                  onDescriptionChange={onTabDescriptionChange}
                  icon={tabIcon}
                  onIconChange={onTabIconChange} />}

              {selectedTab === 'filters' &&
                <TabFilters
                  filters={tabFilters}
                  onFilterAdd={onTabFilterAdd}
                  onFiltersUpdate={onTabFiltersUpdate}
                  onFiltersDelete={onTabFiltersDelete} />}

              {selectedTab === 'workOrderButtons' &&
                <TabWorkOrderButtons
                  buttons={tabWorkOrderButtons}
                  showOperationIcon={tabShowOperationIcon}
                  onShowOperationIconChange={onTabShowOperationIconChange}
                  onButtonAdd={onTabButtonAdd}
                  onButtonUpdate={onTabButtonUpdate}
                  onButtonsDelete={onTabButtonsDelete} />}
            </div>
          </Grid>
        </div>
      </Dialog>
    )
  }
}

ConfigDialog.propTypes = {
  classes: PropTypes.object,

  isOpen: PropTypes.bool,
  onClose: PropTypes.func,

  tabName: PropTypes.string,
  onTabNameChange: PropTypes.func,

  tabDescription: PropTypes.string,
  onTabDescriptionChange: PropTypes.func,

  tabIcon: PropTypes.string,
  onTabIconChange: PropTypes.func,

  tabFilters: PropTypes.array,
  onTabFilterAdd: PropTypes.func,
  onTabFiltersUpdate: PropTypes.func,
  onTabFiltersDelete: PropTypes.func,

  tabWorkOrderButtons: PropTypes.array,
  onTabButtonAdd: PropTypes.func,
  onTabButtonUpdate: PropTypes.func,
  onTabButtonsDelete: PropTypes.func,

  tabShowOperationIcon: PropTypes.bool,
  onTabShowOperationIconChange: PropTypes.func
}

export default withStyles(styles)(ConfigDialog)
