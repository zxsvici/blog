interface ShortIntroduction {
    avatar: string,
    name: string,
    signature: string[],
    bili: string,
    github: string,
    wyy: string,
    mail: string,
    hobbyList: (ShowItem) []
}

interface ShowItem {
    key: string,
    value: string
}

interface AboutIntroduction {
    content: string,
    commentEnable: boolean
}

interface AccountInfo {
    nickname: string,
    link: string,
    img: string
}

interface HobbyInfo {
    key: string,
    value: string
}

interface IntroductionRes {
    avatar: string,
    name: string,
    signature: string[],
    accountList: AccountInfo[]
    hobbyList: HobbyInfo[]
}

export type {
    ShortIntroduction,
    AboutIntroduction,
    HobbyInfo,
    AccountInfo,
    IntroductionRes
}