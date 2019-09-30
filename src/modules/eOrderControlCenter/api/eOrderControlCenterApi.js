import Api from '../../../api/Api'

export const TeamApi = new Api('http://s-be-ki-brixdev:8319/api/Teams')
export const TeamOperatorApi = new Api('http://s-be-ki-brixdev:8319/api/Operators')
export const UserApi = new Api('http://s-be-ki-brixdev:8310/api/Users')

export const ConfigurationDataApi = new Api('http://s-be-ki-brixdev:8252/api/ConfigurationData')
export const SourceApi = new Api('http://s-be-ki-brixdev:8251/api/Sources')
export const OperationApi = new Api('http://s-be-ki-brixdev:8251/api/Operations')
export const BusinessUnitApi = new Api('http://s-be-ki-brixdev:8251/api/BusinessUnits')
export const IconApi = new Api('http://s-be-ki-brixdev:8251/api/Icons')
export const FlowApi = new Api('http://s-be-ki-brixdev:8251/api/Flows')
export const LayoutApi = new Api('http://s-be-ki-brixdev:8251/api/Layouts')
export const WorkOrderApi = new Api('http://s-be-ki-brixdev:8296/api/WorkOrders')
export const WorkOrderPropertyApi = new Api('http://s-be-ki-brixdev:8296/api/Properties')
