import {TagInfo} from "@/model/tag";
import {CategoryInfo} from "@/model/category";
import {PageQuery} from "@/model";

interface BlogQuery extends PageQuery{
    key?: string,
    tagIdList?: number[],
    categoryId?: number
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
    tagIdList: number[],
    categoryId: number,
    commentFlag: boolean,
    topFlag: boolean,
    publicFlag: boolean
}

interface BlogEditReq {
    id: number,
    title: string,
    headerImage: string,
    description: string,
    content: string,
    tagIdList: number[],
    categoryId?: number,
    commentFlag: boolean,
    topFlag: boolean,
    publicFlag: boolean
}

export type {
    BlogQuery,
    BlogInfo,
    BlogEditReq
}