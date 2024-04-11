import {Button, message, Space, Switch} from "antd";
import markdown from "@/utils/markdown";
import MdEditor from "react-markdown-editor-lite";
import {useEffect, useState} from "react";
import viciRequest from "@/config/axios";
import {BaseConfig, BaseConfigReq, BaseConfigType, PageConfig} from "@/model/config";

const PageConfigEdit = ({type}: {type: BaseConfigType}) => {

    const [content, setContent] = useState<string>('');
    const [status, setStatus] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        query();
    }, [type]);

    const markdownImgUpload = async (file: File, callback: Function) => {
        let formData = new FormData();
        formData.set("file", file);
        // 异步操作会导致回调函数设置url失败
        const res = await viciRequest.post("/images", formData, {headers: {'Content-Type': 'multipart/form-data'}});
        callback(res);
    }

    const query = () => {
        viciRequest.get(`/admin/config/type/${type}`).then((res: any) => {
            const response = res as BaseConfig[];
            setId(response[0].id);
            const config = JSON.parse(response[0].value);
            setStatus(config.commentEnable);
            setContent(config.content);
        });
    }

    const save = () => {
        const req: BaseConfigReq = {
            configList: [
                {id: id, type: type, value: JSON.stringify({commentEnable: status, content: content} as PageConfig)} as BaseConfig
            ],
            type: type
        };
        viciRequest.post(`/admin/config/type`, req).then(res => {
            query();
            message.info(`保存成功`);
        })
    }

    return (
        <div>
            <Space>
                <span>开放评论</span>
                <Switch checked={status} onChange={setStatus}/>
            </Space>
            <div>
                <div>交友宣言</div>
                <MdEditor
                    id={"description"}
                    value={content}
                    renderHTML={(text) => markdown.parse(text)}
                    onChange={({text}) => setContent(text)}
                    onImageUpload={((file, callback) => markdownImgUpload(file, callback))}
                    className={'markdown'}
                />
            </div>
            <div style={{textAlign: "center"}}>
                <Button type={"primary"} htmlType={"submit"} onClick={() => save()}>保存</Button>
            </div>
        </div>
    )
}

export default PageConfigEdit;