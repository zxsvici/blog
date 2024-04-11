interface Res<T> {
    readonly code: number,
    readonly data: T,
    readonly timestamp: number,
    readonly msg: string
}

interface PageInfo {
    pageNo: number,
    pageSize: number,
    pages: number,
    total: number
}

const DEFAULT_PAGE_INFO: PageInfo = {pageNo: 1, pageSize: 10, pages: 0, total: 0}

interface PageRes<T> {
    readonly page: PageInfo,
    readonly list: (T)[]
}

export type {
    Res,
    PageInfo,
    PageRes,
}

export {
    DEFAULT_PAGE_INFO
}