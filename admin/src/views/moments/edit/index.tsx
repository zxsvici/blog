import MdEditor from "react-markdown-editor-lite";
import markdown from "@/utils/markdown";
import viciRequest from "@/config/axios";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, DatePicker, DatePickerProps, message, TimePicker} from "antd";
import {MomentInfo} from "@/model/moment";
import {parseISO} from "date-fns";
import dayjs from 'dayjs';

const MomentEdit = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<MomentInfo>({
        content: "",
        createTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        deleteFlag: false,
        id: 0,
        likes: 0,
        publicFlag: true
    });

    useEffect(() => {
        if(id != undefined) {
            viciRequest.get(`/admin/moments/get/${id}`).then((res: any) => {
                const response = res as MomentInfo;
                setData(response);
            })
        }
    }, []);

    const markdownImgUpload = async (file: File, callback: Function) => {
        let formData = new FormData();
        formData.set("file", file);
        // 异步操作会导致回调函数设置url失败
        const res = await viciRequest.post("/images", formData, {headers: {'Content-Type': 'multipart/form-data'}});
        callback(res);
    }

    const save = () => {
        viciRequest.post(`/admin/moments`, data).then(res => {
            message.info(`保存成功`);
            navigate('/moments');
        });
    }

    const onDateChange = (date, dateString, index) => {
        const split = data.createTime.split('T');
        split[index] = dateString;
        setData(pre => ({...pre, createTime: split.join('T')}));
    };

    return (
        <div>
            <div>
                <DatePicker value={dayjs(data.createTime, 'YYYY-MM-DDTHH:mm:ss')} showNow={true}
                            onChange={(date, dateString) => onDateChange(date, dateString, 0)}/>
                <TimePicker value={dayjs(data.createTime, 'YYYY-MM-DDTHH:mm:ss')} showNow={true}
                            onChange={(date, dateString) => onDateChange(date, dateString, 1)}/>
            </div>
            <MdEditor
                id={"description"}
                value={data.content}
                renderHTML={(text) => markdown.parse(text)}
                onChange={({text}) => setData(pre => ({...pre, content: text}))}
                onImageUpload={((file, callback) => markdownImgUpload(file, callback))}
                className={'markdown'}
            />
            <div style={{textAlign: "center"}}>
                <Button type={"primary"} htmlType={"submit"} onClick={() => save()}>保存</Button>
            </div>
        </div>
    )
}

export default MomentEdit;