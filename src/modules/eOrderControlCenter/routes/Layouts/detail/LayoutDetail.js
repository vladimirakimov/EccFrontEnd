import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar/AppBar'
import DeleteDialog from '~/components/DialogDelete'
import { generateRoute } from '~/utils/routeGenerator'
import { ACTIONS as DATA_ACTIONS } from '../../../redux/Layout/layout.actions'
import { getLayout } from '../../../redux/Layout/layout.selector'
import { ROUTES } from '../../config'
import { ACTIONS } from './redux/layoutDetail.actions'
import LayoutDefinitionTab from './components/LayoutDefinitionTab'
import LayoutScreensTab from './components/LayoutScreensTab'
import Application from './components/FlowChart/Application'

const styles = theme => ({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    padding: '80px 16px 16px',
    background: theme.palette.default.background
  },
  container: {
    position: 'relative',
    background: theme.palette.default.card,
    border: `1px solid ${theme.palette.default.border}`
  },
  content: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 210px)',
    marginBottom: 70
  },
  tabs: {
    color: theme.palette.default.contrastText,
    borderBottom: `1px solid ${theme.palette.default.border}`
  },
  controlsContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 70,
    padding: '0 16px',
    background: theme.palette.default.card,
    borderTop: `1px solid ${theme.palette.default.border}`,
    '& button:not(:last-child)': {
      marginRight: 16
    }
  },
  form: {
    height: '100%'
  }
})

class LayoutsDetail extends React.PureComponent {
  state = {
    deleteDialog: false
  }

  constructor (props) {
    super(props)

    this.diagramApp = new Application()
  }

  componentDidMount () {
    const { match, getLayout } = this.props
    getLayout(match.params.id)
  }

  componentDidUpdate (oldProps) {
    if (oldProps.layout === this.props.layout) {
      return
    }

    if (!this.props.layout) {
      return
    }

    const diagramEngine = this.diagramApp.getDiagramEngine()
    const diagramModel = diagramEngine.getDiagramModel()
    if (this.props.layout.diagram) {
      try {
        const parsedJSON = JSON.parse(this.props.layout.diagram)
        diagramModel.deSerializeDiagram(parsedJSON, diagramEngine)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  handleBackButtonClicked = team => {
    const {
      history,
      changeTab
    } = this.props

    history.push(generateRoute(ROUTES.LAYOUTS))
    changeTab('definition')
  }

  handleDeleteDialogOpen = () => {
    const { layout, getLayout } = this.props
    getLayout(layout.id)

    this.setState({ deleteDialog: true })
  }

  handleDeleteDialogClose = () => this.setState({ deleteDialog: false })

  handleDeleteDialogConfirm = () => {
    const { layout, deleteLayout } = this.props

    deleteLayout(layout.id)
  }

  render () {
    const { deleteDialog } = this.state
    const {
      classes,
      layout,
      selectedTab,
      changeTab,
      updateLayout
    } = this.props

    return (
      <div className={classes.root}>
        <AppBar
          title={`Layout Detail - ${layout.name ? layout.name : ''}`}
          canGoBack={true}
          canSearch={false}
          goToPreviousPage={() => this.handleBackButtonClicked()} />

        <Grid container className={classes.container} direction="column">
          <Tabs
            className={classes.tabs}
            value={selectedTab}
            onChange={(e, tab) => changeTab(tab)}>
            <Tab value='definition' label='Definition' />
            <Tab value='screens' label='Screens' />
          </Tabs>

          <div className={classes.content}>
            {Object.keys(layout).length > 0 &&
              <Formik
                initialValues={{
                  name: layout.name,
                  description: layout.description,
                  image: layout.image
                }}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  const diagramData = this.diagramApp.diagramEngine.getDiagramModel().serializeDiagram()
                  const newLayout = {
                    ...layout,
                    name: values.name,
                    description: values.description,
                    image: values.image,
                    diagram: JSON.stringify(diagramData)
                  }
                  updateLayout(newLayout)
                  setSubmitting(false)
                }}>
                {props =>
                  <form onSubmit={props.handleSubmit} className={classes.form}>
                    {selectedTab === 'definition' &&
                      <LayoutDefinitionTab {...props} />}
                    {selectedTab === 'screens' &&
                      <LayoutScreensTab diagramApp={this.diagramApp} />}

                    <Grid container className={classes.controlsContainer}>
                      <Button onClick={this.handleDeleteDialogOpen} variant="outlined">
                        Delete
                      </Button>
                      <Button type='submit' variant="contained" color="primary">
                        Save
                      </Button>
                    </Grid>
                  </form>
                }
              </Formik>
            }
          </div>
        </Grid>

        {layout &&
          <DeleteDialog
            isOpen={deleteDialog}
            title='Delete layout'
            content={`Layout ${layout.name} and all the related information will be deleted. Are you sure?`}
            onConfirm={this.handleDeleteDialogConfirm}
            onCancel={this.handleDeleteDialogClose} />
        }
      </div>
    )
  }
}

LayoutsDetail.propTypes = {
  classes: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,

  selectedTab: PropTypes.string,
  changeTab: PropTypes.func,

  layout: PropTypes.object,
  getLayout: PropTypes.func,
  updateLayout: PropTypes.func,
  deleteLayout: PropTypes.func
}

const mapStateToProps = (state) => ({
  layout: getLayout(state),
  selectedTab: state.pages.layouts.layoutDetail.selectedTab
})

const mapDispatchToProps = (dispatch) => ({
  getLayout: id => dispatch(DATA_ACTIONS.getById(id)),
  updateLayout: layout => dispatch(DATA_ACTIONS.update(layout)),
  deleteLayout: layoutId => dispatch(DATA_ACTIONS.delete(layoutId)),
  changeTab: tab => dispatch(ACTIONS.changeTab(tab))
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutsDetail)))
