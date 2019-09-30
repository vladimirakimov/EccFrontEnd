// @flow

export type ItemType = {
    title: string,
    id: string
}

export type Component = {
    value: string,
    name: string,
    label: string,
    type: string,
    items: Array<ItemType>
}

export type StepMeta = {
    endpoint: string,
    name: string,
    type: string,
    title: string
}

export type ComponentMeta = {
    value: string,
    name: string,
    label: string,
    type: string,
    items: Array<ItemType>
}

export type StepComponent = {
    meta: ComponentMeta
}

export type Step = {
    meta: StepMeta,
    data: Array<StepComponent>
}

export type User = {
    authenticated: false
}

export type TableHeaderItem = {
    id: string,
    label: string
}
export type TableContentItem = {
    id: string,
    name: string,
    calories: string,
    fat: string,
    carbs: string
}

export type DataTableComponent = {
    value: string,
    name: string,
    label: string,
    type: string,
    items: [ItemType],
    tableHeaderData: Array<TableHeaderItem>,
    tableContentData: Array<TableContentItem>
}
