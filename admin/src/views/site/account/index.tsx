import {Avatar, Button, Form, Input, Modal, Image, Space, Upload} from "antd";
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {AccountInfo, BaseConfig, BaseConfigType} from "@/model/config";
import {queryBaseConfigByType, saveBaseConfig, uploadImage} from "@/utils/request";
import {RcFile} from "antd/es/upload";

const AccountEdit = () => {

    const [editForm] = Form.useForm();

    const [accountList, setAccountList] = useState<AccountInfo[]>([
        {id: 1, img: "1", link: "1", nameCn: "1", nameEn: "1", nickname: "1", basicFlag: true, type: BaseConfigType.ACCOUNT},
        {id: 2, img: "2", link: "2", nameCn: "2", nameEn: "2", nickname: "2", basicFlag: false, type: BaseConfigType.ACCOUNT},
    ]);

    useEffect(() => {
        query();
    }, []);

    const query = () => {
        queryBaseConfigByType(BaseConfigType.ACCOUNT).then(res => {
            const list: AccountInfo[] = [];
            res.forEach(item => {
                const parse = JSON.parse(item.value) as {link: string, img: string, nickname: string};
                list.push({
                    id: item.id,
                    basicFlag: item.basicFlag,
                    nameCn: item.nameCn,
                    nameEn: item.nameEn,
                    type: item.type,
                    link: parse.link,
                    img: parse.img,
                    nickname: parse.nickname
                });
            });
            setAccountList(list);
            editForm.setFieldValue('accountList', list);
        });
    }

    const baseAdd = () => {
        const req = {
            id: 0,
            img: "",
            link: "",
            nameCn: "ccc",
            nameEn: "",
            nickname: "",
            basicFlag: false,
            type: BaseConfigType.ACCOUNT
        }
        setAccountList(pre => [...pre, req]);
    }

    const onFinish = (values: Object) => {
        const configs : BaseConfig[] = [];
        editForm.getFieldValue('accountList').forEach(item => {
            configs.push({basicFlag: false,
                id: item.id ? item.id : 0,
                nameCn: item.nameCn,
                nameEn: item.nameEn,
                type: BaseConfigType.ACCOUNT,
                value: JSON.stringify({img: item.img, link: item.link, nickname: item.nickname})}
            );
        });
        saveBaseConfig(BaseConfigType.ACCOUNT, configs).then(res => {
            query();
        })
    };

    const upload = (file: any, name: number) => {
        uploadImage(file).then(res => {
            const newList = [...accountList];
            newList[name].img = res;
            setAccountList(newList);
        });
    }

    const imgBlur = (img: string, name: number) => {
        const list = [...accountList];
        list[name].img = img;
        setAccountList(list);
    }

    return (
        <div>
            <Form form={editForm}
                  onFinish={onFinish}
                  style={{maxWidth: '1000px', alignItems: "center", margin: "0 auto"}}>
                <Form.List name="accountList" initialValue={accountList}>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                    <Form.Item
                                        label={'类型'}
                                        {...restField}
                                        name={[name, 'nameEn']}
                                        rules={[{required: true, message: '类型不可为空'}]}
                                        initialValue={`account${name}`}
                                    >
                                        <Input placeholder="账号类型"/>
                                    </Form.Item>
                                    <Form.Item
                                        label={'图标地址'}
                                        {...restField}
                                        name={[name, 'img']}
                                        rules={[{required: true, message: '账户图标不可为空'}]}
                                    >
                                        <Input placeholder={'账户图标地址'}
                                               onBlur={({target}) => imgBlur(target.value, name)}
                                               addonAfter={
                                                   <Space>
                                                       <Upload
                                                           name="file"
                                                           showUploadList={false}
                                                           customRequest={({file}) => upload(file, name)}
                                                       >
                                                           <UploadOutlined/>
                                                       </Upload>
                                                       {
                                                           accountList[name].img &&
                                                           <Image src={accountList[name].img} className={'input-right-image'} style={{borderRadius: '50%'}}/>
                                                       }
                                                   </Space>
                                               }
                                               style={{verticalAlign: 'middle'}}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={'昵称'}
                                        {...restField}
                                        name={[name, 'nickname']}
                                        rules={[{required: true, message: '昵称不可为空'}]}
                                    >
                                        <Input placeholder="昵称"/>
                                    </Form.Item>
                                    <Form.Item
                                        label={'访问链接'}
                                        {...restField}
                                        name={[name, 'link']}
                                        rules={[{required: true, message: '访问链接不可为空'}]}
                                    >
                                        <Input placeholder="访问链接"/>
                                    </Form.Item>
                                    {!accountList[name].basicFlag ?
                                        <MinusCircleOutlined onClick={() => {
                                            remove(name);
                                        }}/> : null}
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => {
                                    baseAdd();
                                    add();
                                }} block icon={<PlusOutlined/>}>
                                    Add field
                                </Button>
                            </Form.Item>
                            <Form.Item style={{textAlign: 'center'}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </div>
    )
}

export default AccountEdit;