import {BaseConfig, BaseConfigReq, BaseConfigType} from "@/model/config";
import viciRequest from "@/config/axios";

const queryBaseConfigByType = (type: BaseConfigType) : Promise<BaseConfig[]> => {
    return viciRequest.get(`/admin/config/type/${type}`).then((res: any) => {
        return res as BaseConfig[];
    })
}

const saveBaseConfig = (type: BaseConfigType, configList: BaseConfig[]) : Promise<boolean> => {
    const req: BaseConfigReq = {type: type, configList: configList} as BaseConfigReq;
    return viciRequest.post(`/admin/config/type`, req).then((res: any) => {
        return res as boolean;
    })
}

const uploadImage = (file: any) : Promise<string> => {
    let formData = new FormData();
    formData.set("file", file);
    return viciRequest.post("/images", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res: any) => {
        return res as string;
    });
}

export {
    queryBaseConfigByType,
    saveBaseConfig,
    uploadImage
}