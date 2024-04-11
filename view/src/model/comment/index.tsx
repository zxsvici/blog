interface CommentVo {
    blogId: number,
    parentId: number,
    content: string,
    nickname: string,
    email: string,
    avatar: string,
    website?: string
}

interface CommentView {
    id: number,
    rootId: number,
    content: string,
    nickname: string,
    parentNickname: string,
    mail: string,
    avatar: string,
    children: (CommentView)[]
    createTime: string,
    website: string
}

interface VisitorInfo {
    nickname: string,
    website: string,
    avatar: string,
    email: string,
    initFlag: boolean
}

interface CommentReply extends CommentVo {
    id: number,
    parentId: number,
}

export type {
    VisitorInfo,
    CommentVo,
    CommentView,
    CommentReply
}