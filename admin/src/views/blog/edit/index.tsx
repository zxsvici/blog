import {useNavigate, useParams} from "react-router-dom"
import {Button, Collapse, Form, Input, Image, message, Select, Switch, Tag, Upload, Space, Segmented} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import MdEditor from 'react-markdown-editor-lite';
import {useEffect, useState} from "react";
import {BlogEditReq} from "@/model/blog";
import {useSelfCacheContext} from "@/components/context";
import {UploadChangeParam, UploadFile} from "antd/es/upload/interface";
import {Res} from "@/model";
import markdown from "@/utils/markdown";
import viciRequest, {DEV_BASE_URL} from "@/config/axios";
import {uploadImage} from "@/utils/request";

const DEFAULT_BLOG = {
    commentFlag: true,
    headerImage: "",
    content: "",
    description: "",
    id: 0,
    publicFlag: true,
    tagIdList: [],
    title: "",
    topFlag: false
};

const BlogEdit = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [data, setData] = useState<BlogEditReq>({...DEFAULT_BLOG});
    const [originalData, setOriginalData] = useState<BlogEditReq>({...DEFAULT_BLOG});
    const [editForm] = Form.useForm<BlogEditReq>();
    const {tagMap, categoryMap} = useSelfCacheContext();
    const [option, setOption] = useState<string>('config');

    useEffect(() => {
        if (id != undefined) {
            viciRequest.get(`/admin/blogs/get/${id}`).then((res: any) => {
                setData({...res});
                setOriginalData({...res});
                editForm.setFieldsValue({...res});
            })
        }
    }, [id]);

    const edit = (text: string, key: string) => {
        const next: BlogEditReq = {...data};
        next[key] = text;
        setData(next);
    }

    const markdownImgUpload = async (file, key, callback) => {
        const res = await uploadImage(file);
        const origin = window.location.origin;
        if(origin.startsWith("http://127.0.0.1")) {
            callback(`${DEV_BASE_URL}${res}`);
        } else {
            callback(`/api${res}`);
        }
    }

    const saveBlog = () => {

        const allData = {...data, ...editForm.getFieldsValue()};

        if (id === undefined) {
            save(allData);
            return;
        }

        const req = {id: id};
        const modifiedFlag = checkModifiedFlag(req, allData);
        if (modifiedFlag) {
            //有更改则进行修改
            save(req);
        } else {
            //如果无更改则直接跳转回去
            back();
        }
    }

    const checkModifiedFlag = (req, allData: BlogEditReq): boolean => {
        let flag = false;
        // 校验属性是否更改，如有更改需要添加进req body
        for (let key in allData) {
            if (allData[key] === undefined) {
                continue;
            }
            if (allData[key] !== originalData[key]) {
                flag = true;
                req[key] = allData[key];
            }
        }
        return flag;
    }

    const save = (req) => {
        viciRequest.post("/admin/blogs", req).then((res: any) => {
            message.info('保存成功！');
            back();
        })
    }

    const back = () => {
        navigate("/blogs");
    }

    const handleLoadOptions = (nextOption: string) => {
        //如果提交时 option 不为 config 则而 editForm 为空
        if(option === 'config') {
            const formData = editForm.getFieldsValue();
            const next = {
                ...data,
                ...formData,
            }
            setData(next);
        }
        setOption(nextOption);
    }

    return (
        <div>
            <Space direction="vertical" style={{display: "flex", background: "white"}}>
                <div style={{textAlign:"center", fontSize: 25, fontWeight: 700}}>
                    <Segmented options={[{label: '配置', value: 'config'}, {label: '描述', value: 'description'},{label: '正文', value: 'content'}]}
                               onChange={handleLoadOptions}
                    />
                </div>
                {option === 'config' && <div style={{}}>
                    <Form form={editForm} style={{maxWidth: "30%", marginLeft: '35%'}} initialValues={data}>
                        <Form.Item name={"title"} label="标题:" required={true}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"categoryId"} label={"分类:"} required={true}>
                            <Select>
                                {[...categoryMap.values()].map(item => {
                                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>;
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={"tagIdList"} label={"标签:"} required={true}>
                            <Select mode={"multiple"}>
                                {[...tagMap.values()].map(tag => {
                                    return <Select.Option key={tag.id} value={tag.id}>
                                        <Tag color={tag.color}>{tag.name}</Tag>
                                    </Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label={"导图"}>
                            <Upload
                                name="file"
                                showUploadList={false}
                                customRequest={({file}) => {
                                    uploadImage(file).then(res => {
                                        console.log("res", res);
                                        let url = window.location.origin + '/api' + res;
                                        if(url.indexOf("/127.0.0.1")) {
                                            url = url.replace("127.0.0.1:9002", "81.69.248.115:7781");
                                        }
                                        console.log("url", url);
                                        setData(pre => ({...pre, headerImage: url}));
                                    })
                                }}
                            >
                                <Button icon={<UploadOutlined/>}>Upload</Button>
                            </Upload>
                            {data.headerImage !== "" ? <Image src={data.headerImage} width={"80px"} height={"40px"}
                                                              style={{marginLeft: "10%"}}/> : null}
                        </Form.Item>
                        <Form.Item name={"publicFlag"} label="是否公开" required={false}>
                            <Switch checked={data.publicFlag} onChange={stat => setData(pre => ({...pre, publicFlag: stat}))}/>
                        </Form.Item>
                        <Form.Item name={"commentFlag"} label="是否开启评论" required={false}>
                            <Switch checked={data.commentFlag} onChange={stat => setData(pre => ({...pre, commentFlag: stat}))}/>
                        </Form.Item>
                        <Form.Item name={"topFlag"} label="是否置顶" required={false}>
                            <Switch checked={data.topFlag} onChange={stat => setData(pre => ({...pre, topFlag: stat}))}/>
                        </Form.Item>
                    </Form>
                </div>}
                {option === 'description' &&<MdEditor
                    id={"description"}
                    value={data.description}
                    renderHTML={(text) => markdown.parse(text)}
                    onChange={(e) => edit(e.text, 'description')}
                    onImageUpload={(file, callback) => markdownImgUpload(file, 'description', callback)}
                    className={'markdown'}
                />}
                {option === 'content' && <MdEditor
                    id={"content"}
                    value={data.content}
                    renderHTML={(text) => markdown.parse(text)}
                    onChange={(e) => edit(e.text, 'content')}
                    onImageUpload={(file, callback) => markdownImgUpload(file, 'content', callback)}
                    className={'markdown'}
                />}
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button type="primary" htmlType={"submit"} onClick={saveBlog}>保存</Button>
                    <Button type="primary" htmlType={"button"} onClick={back}
                            style={{marginLeft: '5%', background: "GrayText"}}>返回</Button>
                </div>
            </Space>
        </div>
    )
}

export default BlogEdit;