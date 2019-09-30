import React from 'react'
import PropTypes from 'prop-types'

import DiagramBody from '../diagram/DiagramBody'

class FlowTab extends React.PureComponent {
  render () {
    const { diagramApp } = this.props

    return (
      <DiagramBody app={diagramApp} />
    )
  }
}

FlowTab.propTypes = {
  diagramApp: PropTypes.any
}

export default FlowTab
