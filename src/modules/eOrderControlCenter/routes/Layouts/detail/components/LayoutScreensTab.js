import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import FlowChartBody from './FlowChart/FlowChartBody'
import { ACTIONS } from '../../../../redux/WorkOrderProperty/workOrderProperty.actions'

class LayoutScreensTab extends React.PureComponent {
  componentDidMount () {
    const { getWorkOrdersProperties } = this.props
    getWorkOrdersProperties()
  }

  render () {
    const { diagramApp } = this.props
    return (
      <FlowChartBody app={diagramApp} />
    )
  }
}

LayoutScreensTab.propTypes = {
  diagramApp: PropTypes.any,
  getWorkOrdersProperties: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  getWorkOrdersProperties: () => dispatch(ACTIONS.get())
})

export default connect(null, mapDispatchToProps)(LayoutScreensTab)
