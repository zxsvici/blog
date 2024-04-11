interface FriendInfo {
    id: number,
    name: string,
    signature: string,
    avatar: string,
    website: string
}

interface FriendsRes {
    content: string,
    commentEnable: boolean
    list: (FriendInfo)[]
}

export type {
    FriendInfo,
    FriendsRes
}