import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ROUTES } from '../config'
import LayoutList from './list/LayoutList'
import LayoutDetail from './detail/LayoutDetail'

const action = () => <Switch>
  <Route exact path={ROUTES.LAYOUTDETAIL} component={LayoutDetail} />
  <Route exact path={ROUTES.LAYOUTS} component={LayoutList} />
</Switch>

export default action
