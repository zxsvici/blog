import {TagInfo} from "@/model/tag";
import {Button, Form, Input, message, Modal, Select} from "antd";
import {useEffect} from "react";
import viciRequest from "@/config/axios";

const colors = [
    {label: '红色', value: 'red'},
    {label: '橘黄', value: 'orange'},
    {label: '黄色', value: 'yellow'},
    {label: '橄榄绿', value: 'olive'},
    {label: '纯绿', value: 'green'},
    {label: '水鸭蓝', value: 'teal'},
    {label: '纯蓝', value: 'blue'},
    {label: '紫罗兰', value: 'violet'},
    {label: '紫色', value: 'purple'},
    {label: '粉红', value: 'pink'},
    {label: '棕色', value: 'brown'},
    {label: '灰色', value: 'grey'},
    {label: '黑色', value: 'black'},
]

const TagEdit = ({ visible, onCancel, data } : { visible: boolean, onCancel: Function, data: TagInfo }) => {

    const [form] = Form.useForm<TagInfo>();

    const handleFormSubmit = () => {
        form.validateFields().then((req: TagInfo) => {
            if(data && data.id) {
                viciRequest.put(`/admin/tags/${data.id}`, req).then(res => {
                    cancel();
                });
            }else {
                viciRequest.post('/admin/tags', req).then(res => {
                    cancel();
                });
            }
        });
    };

    const cancel = () => {
        message.info('保存成功');
        form.resetFields();
        onCancel();
    }

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue({...data});
    }, [visible])

    return (
        <Modal
            open={visible}
            title="添加标签"
            onCancel={() => onCancel()}
            footer={[
                <Button key="cancel" onClick={() => onCancel()}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={() => handleFormSubmit()}>
                    提交
                </Button>,
            ]}
        >
            <Form form={form}>
                <Form.Item label="标签名称" name="name" rules={[{ required: true, message: "请输入名称" }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="标签颜色" name="color" rules={[{ required: true, message: "请输入名称" }]}>
                    <Select>
                        {colors.map(item => {
                            return <Select.Option key={item.value} value={item.value}>
                                <Form layout="inline">
                                    <Form.Item label={item.label}>
                                        <div style={{height: '20px', width: '40px', background: item.value}}/>
                                    </Form.Item>
                                </Form>
                            </Select.Option>
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default TagEdit;