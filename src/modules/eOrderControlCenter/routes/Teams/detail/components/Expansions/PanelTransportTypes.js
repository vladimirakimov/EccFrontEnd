import React from 'react'
import PropTypes from 'prop-types'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'

import ExpansionPanelNew from '~/components/ExpansionPanelNew'

class PanelTransportTypes extends React.PureComponent {
  render () {
    const {
      transportTypes,
      selectedTransportTypes,
      onChange
    } = this.props

    return (
      <ExpansionPanelNew
        icon={<LocalShippingIcon />}
        title="Transport types"
        items={transportTypes}
        selectedItems={selectedTransportTypes}
        onChange={onChange} />
    )
  }
}

PanelTransportTypes.propTypes = {
  transportTypes: PropTypes.any,
  selectedTransportTypes: PropTypes.any,
  onChange: PropTypes.func
}

export default PanelTransportTypes
