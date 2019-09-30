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
import { getIcons } from '../../redux/Icon/icon.selector'
import { ACTIONS as DATA_ACTIONS } from '../../redux/Icon/icon.actions'
import { ACTIONS as LIST_ACTIONS } from './redux/iconList.actions'

const styles = () => ({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 96px)',
    padding: '80px 16px 16px'
  }
})

class Icons extends React.PureComponent {
  constructor (props, context) {
    super(props, context)

    this.columns = [
      { name: 'name', caption: props.intl.formatMessage({ id: 'icon.grid.header.name' }) },
      { name: 'dataPath', caption: props.intl.formatMessage({ id: 'icon.grid.header.icon' }) }
    ]
  }

  componentDidMount () {
    const { getIcons } = this.props
    getIcons()
  }

  getRowId (row) {
    return row.id
  }

  render () {
    const { classes, icons } = this.props
    return (
      <React.Fragment>
        <AppBar title='Business Units' />

        <div className={classes.root}>
          <ButtonAdd />
          <Paper>
            <Grid
              rows={icons}
              columns={this.columns}
            />
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

Icons.propTypes = {
  classes: PropTypes.object,
  intl: PropTypes.object,

  icons: PropTypes.array,
  getIcons: PropTypes.func,

  addedRows: PropTypes.any,
  changeAddedRows: PropTypes.func,

  editingRowIds: PropTypes.array,
  changeEditingRowIds: PropTypes.func,
  changeRowChanges: PropTypes.func,
  rowChanges: PropTypes.any,
  commitChanges: PropTypes.func,

  deletingRowIds: PropTypes.array,
  cancelDelete: PropTypes.func,
  confirmDelete: PropTypes.func,

  errors: PropTypes.any
}

const mapStateToProps = state => ({
  ...selectGridState(state.pages.icons),
  icons: getIcons(state)
})

const mapDispatchToProps = dispatch => ({
  ...mapGridActions(dispatch, LIST_ACTIONS),
  getIcons: () => {
    dispatch(DATA_ACTIONS.getList())
  }
})

export default withStyles(styles)(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Icons)))
