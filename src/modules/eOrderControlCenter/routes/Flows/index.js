import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ROUTES } from '../config'
import List from './list/FlowList'
import Detail from './detail/FlowDetail'

const action = () => <Switch>
  <Route exact path={ROUTES.FLOWDETAIL} component={Detail} />
  <Route exact path={ROUTES.FLOWS} component={List} />
</Switch>

export default action
