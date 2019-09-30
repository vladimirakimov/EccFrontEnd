import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ROUTES } from '../config'
import List from './list/TeamList'
import Detail from './detail/TeamDetail'

const action = () => <Switch>
  <Route exact path={ROUTES.TEAMDETAIL} component={Detail} />
  <Route exact path={ROUTES.TEAMS} component={List} />
</Switch>

export default action
