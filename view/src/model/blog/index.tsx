import {PageInfo} from "@/model";

interface BlogListItem {
    id: number,
    title: string,
    createTime: string,
    visits: number,
    description: string,
    words: number,
    categoryId: number,
    tagIdList: number[]
}

interface BlogItemInfo {
    id: number,
    title: string,
    createTime: string,
    visits: number,
    description: string,
    words: number,
    category: Category,
    tagList: BlogTag[]
}


interface BlogViewTocItem {
    level: number,
    anchor: any,
    children?: BlogViewTocItem[],
    parent?: BlogViewTocItem
}

interface BlogInfo {
    id: number,
    title: string,
    description: string,
    content: string,
    visits: number,
    words: number,
    createTime: string,
    modifyTime: string,
    tagList: BlogTag[],
    category?: Category,
    commentFlag: boolean,
    topFlag: boolean
}

interface Category {
    id: number,
    name: string
}

interface BlogTag {
    id: number,
    name: string,
    color: string
}

enum QueryType {
    ALL,
    CATEGORY,
    TAG,
    LIKE,
}

interface BlogListQueryInfo {
    pageInfo: PageInfo,
    type: QueryType,
    key: string
}

export type {
    BlogInfo,
    BlogItemInfo,
    BlogViewTocItem,
    BlogTag,
    Category,
    BlogListQueryInfo
}

export {
    QueryType
}