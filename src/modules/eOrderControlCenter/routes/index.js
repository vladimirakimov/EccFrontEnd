import Loadable from 'react-loadable'

import { ROUTES } from './config'
import LoadingIndicator from '../../../components/ProgressOverlay'

export default {
  orderOverview: {
    path: ROUTES.ORDER_OVERVIEW,
    protected: true,
    component: Loadable({
      loader: () => import('./WorkOrders/list'),
      loading: LoadingIndicator
    })
  },
  users: {
    path: ROUTES.USERS,
    protected: true,
    component: Loadable({
      loader: () => import('./Users'),
      loading: LoadingIndicator
    })
  },
  teams: {
    path: ROUTES.TEAMS,
    protected: true,
    component: Loadable({
      loader: () => import('./Teams'),
      loading: LoadingIndicator
    })
  },
  flows: {
    path: ROUTES.FLOWS,
    protected: true,
    component: Loadable({
      loader: () => import('./Flows'),
      loading: LoadingIndicator
    })
  },
  layouts: {
    path: ROUTES.LAYOUTS,
    protected: true,
    component: Loadable({
      loader: () => import('./Layouts'),
      loading: LoadingIndicator
    })
  },
  barcodes: {
    path: ROUTES.BARCODES,
    protected: true,
    component: Loadable({
      loader: () => import('./Barcodes'),
      loading: LoadingIndicator
    })
  },
  businessUnits: {
    path: ROUTES.BUSINESS_UNITS,
    protected: true,
    component: Loadable({
      loader: () => import('./BusinessUnits'),
      loading: LoadingIndicator
    })
  },
  sources: {
    path: ROUTES.SOURCES,
    protected: true,
    component: Loadable({
      loader: () => import('./Sources'),
      loading: LoadingIndicator
    })
  },
  operations: {
    path: ROUTES.OPERATIONS,
    protected: true,
    component: Loadable({
      loader: () => import('./Operations'),
      loading: LoadingIndicator
    })
  },
  icons: {
    path: ROUTES.ICONS,
    protected: true,
    component: Loadable({
      loader: () => import('./Icons'),
      loading: LoadingIndicator
    })
  }
}
