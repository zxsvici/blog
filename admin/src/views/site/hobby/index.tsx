import {Button, Form, Input, Space} from "antd";
import {BaseConfig, BaseConfigType} from "@/model/config";
import {useEffect, useState} from "react";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {queryBaseConfigByType, saveBaseConfig} from "@/utils/request";

const HobbyEdit = () => {

    const [editForm] = Form.useForm();
    const [configList, setConfigList] = useState<BaseConfig[]>([]);

    useEffect(() => {
        query();
    }, [])

    const query = () => {
        queryBaseConfigByType(BaseConfigType.HOBBY).then(res => {
            setConfigList(res);
            editForm.setFieldValue('hobbyList', res);
        });
    }

    const save = (values) => {
        const configs : BaseConfig[] = [];
        values['hobbyList'].forEach(item => {
            const find = configList.find(it => it.nameCn === item.nameCn);
            configs.push({
                ...find,
                nameCn: item.nameCn,
                value: item.value,
                nameEn: item.nameEn ? item.nameEn : Date.now().toString(),
                type: BaseConfigType.HOBBY
            });
        });
        saveBaseConfig(BaseConfigType.HOBBY, configs).then(res => {
            query();
        })
    }

    return (
        <>
            <Form form={editForm} style={{maxWidth: '700px', alignItems: "center", margin: "0 auto"}} onFinish={save}>
                <Form.List name={'hobbyList'}>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                   <Space style={{margin: '0 auto', alignItems: "center", justifyContent: "center"}}>
                                       <Form.Item label={'标题'} name={[name, 'nameCn']} {...restField}>
                                           <Input placeholder="标题"/>
                                       </Form.Item>
                                       <Form.Item label={'内容'} name={[name, 'value']} {...restField}>
                                           <Input.TextArea placeholder="内容" autoSize={{minRows: 1, maxRows: 3}} style={{minWidth: '400px'}}/>
                                       </Form.Item>
                                   </Space>
                                    {(name >= configList.length || !configList[name].basicFlag) ? <MinusCircleOutlined onClick={() => {remove(name);}}/> : null}
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => {
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
        </>
    )
}

export default HobbyEdit;