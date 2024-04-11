interface CommentInfo {
    id: number,
    parentId: number,
    content: string,
    nickname: string,
    avatar: string,
    createTime: string,
    deleteFlag: boolean,
    remindFlag: boolean
}

interface CommentTreeNode {
    id: number,
    parentNickname: string,
    content: string,
    nickname: string,
    avatar: string,
    createTime: string,
    deleteFlag: boolean,
    website: string,
    children: CommentTreeNode[]
}

export type {
    CommentInfo,
    CommentTreeNode
}