interface BaseConfig {
    id: number,
    nameEn: string,
    nameCn: string,
    value: string,
    basicFlag: boolean,
    type: string
}

interface BaseConfigReq {
    type: string,
    configList: BaseConfig[]
}

interface PageConfig {
    commentEnable: boolean,
    content: string
}


interface AccountInfo {
    id: number,
    nameEn: string,
    nameCn: string,
    nickname: string,
    link: string,
    img: string,
    basicFlag: boolean,
    type: string
}

enum BaseConfigType {
    INTRODUCTION = 'INTRODUCTION',
    ACCOUNT = 'ACCOUNT',
    HOBBY = 'HOBBY',
    SITE = 'SITE',
    ABOUT = 'ABOUT',
    FRIEND = 'FRIEND'
}

export type {
    BaseConfig,
    PageConfig,
    BaseConfigReq,
    AccountInfo
}

export {
    BaseConfigType
}