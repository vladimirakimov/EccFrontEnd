import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Grid from '@katoennatie/frontend-components/dist/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar/AppBar'
import ButtonAdd from '~/components/ButtonAdd'
import { selectGridState, mapGridActions } from '~/utils/dxGridHelpers'
import { ACTIONS as DATA_ACTIONS } from '../../redux/Operation/operation.actions'
import { ACTIONS as DATA_ACTIONS_ICONS } from '../../redux/Icon/icon.actions'
import { ACTIONS as LIST_ACTIONS } from './redux/operationList.actions'
import { getOperations } from '../../redux/Operation/operation.selector'
import { getIcons } from '../../redux/Icon/icon.selector'

const styles = () => ({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 96px)',
    padding: '80px 16px 16px'
  },
  flex: {
    flex: 1
  }
})

class Operations extends React.PureComponent {
  constructor (props, context) {
    super(props, context)

    this.columns = [
      { name: 'name', caption: props.intl.formatMessage({ id: 'operation.grid.header.operation' }) },
      { name: 'description', caption: props.intl.formatMessage({ id: 'operation.grid.header.description' }) },
      { name: 'tags', caption: props.intl.formatMessage({ id: 'operation.grid.header.tags' }) }
    ]
  }

  componentDidMount () {
    const { getOperations } = this.props
    getOperations()
  }

  getRowId (row) {
    return row.id
  }

  render () {
    const {
      classes,
      operations
    } = this.props

    return (
      <React.Fragment>
        <AppBar title='Operations' />

        <div className={classes.root}>
          <ButtonAdd />
          <Paper>
            <Grid
              rows={operations}
              columns={this.columns}
            />
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

Operations.propTypes = {
  classes: PropTypes.object,
  operations: PropTypes.array,
  getOperations: PropTypes.func,
  intl: PropTypes.any
}

const mapStateToProps = (state, ownProps) => ({
  ...selectGridState(state.pages.operations),
  operations: getOperations(state),
  icons: getIcons(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...mapGridActions(dispatch, LIST_ACTIONS),
  getOperations: () => {
    dispatch(DATA_ACTIONS.getList())
  },
  getIcons: () => {
    dispatch(DATA_ACTIONS_ICONS.getList())
  }
})

export default withStyles(styles)(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Operations)))
