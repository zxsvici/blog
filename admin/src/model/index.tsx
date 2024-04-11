interface Res<T> {
    readonly code: number,
    readonly data: T,
    readonly timestamp: number,
    readonly msg: string
}

interface PageQuery {
    pageNo: number,
    pageSize: number
}

interface PageInfo extends PageQuery{
    pages: number,
    total: number
}

interface PageRes<T> {
    readonly page: PageInfo,
    readonly list: (T)[]
}

export type {
    Res,
    PageInfo,
    PageRes,
    PageQuery
}