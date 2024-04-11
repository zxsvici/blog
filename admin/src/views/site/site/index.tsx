import {Button, Form, Image, Input, Space, Upload} from "antd";
import {BaseConfig, BaseConfigType} from "@/model/config";
import {useEffect, useState} from "react";
import {queryBaseConfigByType, saveBaseConfig, uploadImage} from "@/utils/request";
import {UploadOutlined} from "@ant-design/icons";


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
    align: 'center',
};

const SiteEdit = () => {

    const [editForm] = Form.useForm();
    const [configList, setConfigList] = useState<BaseConfig[]>([]);


    useEffect(() => {
        query();
    }, []);

    const query = () => {
        queryBaseConfigByType(BaseConfigType.SITE).then(res => {
            setConfigList(res);
            res.forEach(item => {
                editForm.setFieldValue(item.nameEn, item.value);
            })
        });
    }

    const onFinish = () => {
        saveBaseConfig(BaseConfigType.SITE, configList).then(res => {
            query();
        })
    }

    const upload = (file: any, key: string) => {
        uploadImage(file).then(res => {
            imgBlur(res, key);
            editForm.setFieldValue(key, res);
        })
    }

    const imgBlur = (url: string, key: string) => {
        // 刷新Image的视图
        const list: BaseConfig[] = [];
        configList.forEach(item => {
            if(item.nameEn === key) {
                item.value = url;
            }
            list.push(item);
        });
        setConfigList(list);
    }

    return (
        <>
            <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                style={{maxWidth: '600px', alignItems: "center", margin: "0 auto"}}
                autoComplete="off"
                form={editForm}
            >
                {configList.map(item => (
                    <Form.Item name={item.nameEn} label={item.nameCn} key={item.nameEn}>
                        <Input placeholder={item.nameCn}
                               onBlur={({target}) => imgBlur(target.value, item.nameEn)}
                               addonAfter={item.nameEn.indexOf('Img') !== -1 ?
                                   <Space>
                                       <Upload
                                           name={item.nameEn}
                                           showUploadList={false}
                                           customRequest={({file}) => upload(file, item.nameEn)}
                                       >
                                           <UploadOutlined/>
                                       </Upload>
                                       <Image src={item.value} className={'input-right-image'}/>
                                   </Space>
                                   :
                                   null
                               }
                        />
                    </Form.Item>
                ))}
                <Form.Item {...formItemLayout} style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default SiteEdit;