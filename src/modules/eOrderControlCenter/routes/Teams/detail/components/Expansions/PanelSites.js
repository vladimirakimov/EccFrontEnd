import React from 'react'
import PropTypes from 'prop-types'
import SettingsBackupRestorerIcon from '@material-ui/icons/LocationOnOutlined'

import ExpansionPanelNew from '~/components/ExpansionPanelNew'

class PanelSites extends React.PureComponent {
  render () {
    const {
      sites,
      selectedSites,
      onChange
    } = this.props

    return (
      <ExpansionPanelNew
        icon={<SettingsBackupRestorerIcon />}
        title="Sites"
        items={sites}
        selectedItems={selectedSites}
        onChange={onChange} />
    )
  }
}

PanelSites.propTypes = {
  sites: PropTypes.any,
  selectedSites: PropTypes.any,
  onChange: PropTypes.func
}

export default PanelSites
