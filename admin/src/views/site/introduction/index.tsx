import {useEffect, useState} from 'react';
import {Button, Form, Image, Input, Space, Upload} from 'antd';
import {BaseConfig, BaseConfigType} from "@/model/config";
import {UploadOutlined} from "@ant-design/icons";
import {queryBaseConfigByType, saveBaseConfig, uploadImage} from "@/utils/request";
import {RcFile} from "antd/es/upload";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    align: 'center',
};

const IntroductionView = () => {

    const [introduction, setIntroduction] = useState<Map<string, BaseConfig>>(new Map());
    const [editForm] = Form.useForm();

    useEffect(() => {
        query();
    }, []);

    const query = () => {
        queryBaseConfigByType(BaseConfigType.INTRODUCTION).then(res => {
            const map = new Map<string, BaseConfig>();
            res.forEach(item => {
                map.set(item.nameEn, item);
            });
            setIntroduction(map);
            map.forEach((item, key) => {
                editForm.setFieldValue(key, item.value);
            })
        });
    }

    const onFinish = (values) => {
        const configs : BaseConfig[] = [];
        introduction.forEach((item, key) => {
            item.value = values[key];
            configs.push(item);
        })
        saveBaseConfig(BaseConfigType.INTRODUCTION, configs).then(res => {
            query();
        })
    }

    const upload = (file: any) => {
        uploadImage(file).then(res => {
            const newMap = new Map(introduction);
            newMap.get('avatar').value = res;
            setIntroduction(newMap);
            editForm.setFieldValue('avatar', res);
        })
    }

    return (
        <div>
            <Form
                name="dynamic_form_nest_item"
                style={{ maxWidth: '600px', alignItems: "center", margin: "0 auto" }}
                autoComplete="off"
                form={editForm}
                onFinish={onFinish}
            >
                <Form.Item name={'name'} label={'昵称'}>
                    <Input placeholder={'昵称'}/>
                </Form.Item>
                <Form.Item name={'avatar'} label={'头像'}>
                    <Input placeholder={'头像'}
                           addonAfter={
                               <Space>
                                   <Upload
                                       name="file"
                                       showUploadList={false}
                                       customRequest={({file}) => upload(file)}
                                   >
                                       <UploadOutlined/>
                                   </Upload>
                                   {
                                       introduction.has('avatar') &&
                                       <Image src={introduction.get('avatar').value} className={'input-right-image'} style={{borderRadius: '50%'}}/>
                                   }
                               </Space>
                           }
                    />
                </Form.Item>
                <Form.Item name={'signature'} label={'个性签名'}>
                    <Input.TextArea placeholder={'个性签名'}/>
                </Form.Item>
                <Form.Item {...formItemLayout} style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default IntroductionView;
