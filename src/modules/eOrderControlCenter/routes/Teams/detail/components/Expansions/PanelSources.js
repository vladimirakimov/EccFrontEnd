import React from 'react'
import PropTypes from 'prop-types'
import SettingsBackupRestorerIcon from '@material-ui/icons/SettingsBackupRestore'

import ExpansionPanelNew from '~/components/ExpansionPanelNew'

class PanelSources extends React.Component {
  render () {
    const {
      sources,
      selectedSources,
      onChange
    } = this.props

    return (
      <ExpansionPanelNew
        icon={<SettingsBackupRestorerIcon />}
        title="Sources"
        items={sources}
        selectedItems={selectedSources}
        onChange={onChange} />
    )
  }
}

PanelSources.propTypes = {
  sources: PropTypes.any,
  selectedSources: PropTypes.any,
  onChange: PropTypes.func
}

export default PanelSources
