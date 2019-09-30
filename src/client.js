import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'

import './index.css'
import config from './i18n/config'
import store from './redux/config'
import App from './containers/App/App'
import { history } from './redux/middleware'

const LOCALE = 'en'
const generateClassName = createGenerateClassName()
const jss = create(jssPreset())

function render () {
  ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName} classNamePrefix='e'>
      <Provider store={store}>
        <IntlProvider
          locale={LOCALE}
          messages={config.messages[LOCALE]}
        >
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>
    </JssProvider>,
    document.getElementById('root')
  )
}

render()
/* MSALAuth.checkAuthToken()
  .then(() => {
    render()
  }) */
