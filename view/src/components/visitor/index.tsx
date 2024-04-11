import {useEffect, useState} from "react";
import {VisitorInfo} from "@/model/comment";
import {Button, Divider, Form, Input, Modal, Select, Tooltip} from "antd";
import baseRequest from "@/config/axios";

const Visitor = ({visible, onCancel, setVisitor}: { visible: boolean, onCancel: Function, setVisitor: Function }) => {

    const [form] = Form.useForm();
    const [accountType, setAccountType] = useState<string>('anonymous');

    const login = () => {
        const visitor: VisitorInfo = form.getFieldsValue() as VisitorInfo;
        visitor.initFlag = true;
        localStorage.setItem('vici_visitor', JSON.stringify(visitor));
        setVisitor(visitor);
    }

    const getInfo = () => {
        const account = form.getFieldValue('account');
        const type = form.getFieldValue('type');
        baseRequest.get(`/visitor/info?account=${account}&type=${type}`).then((res: any) => {
            const response = res as VisitorInfo;
            form.setFieldValue('nickname', response.nickname);
            form.setFieldValue('avatar', response.avatar);
            if(response.website) {
                form.setFieldValue('website', response.website);
            }
            if(form.getFieldValue('type') === 'QQ') {
                form.setFieldValue('email', form.getFieldValue('account') + '@qq.com');
            }
        })
    }

    const cancel = () => {
        form.resetFields();
        setAccountType('anonymous');
        onCancel();
    }

    return (
        <Modal
            open={visible}
            title="来浅浅踩个脚印吧"
            onCancel={cancel}
            footer={[
                <Button key="cancel" onClick={cancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={login}>
                    提交
                </Button>,
            ]}
        >
            <Form form={form}>
                <Form.Item name={'type'} label={'足迹类型'} initialValue={'anonymous'} required={false}>
                    <Select value={'anonymous'} onChange={(t) => setAccountType(t)}>
                        <Select.Option key={'anonymous'} value={'anonymous'}>匿名</Select.Option>
                        <Select.Option key={'QQ'} value={'QQ'}>QQ</Select.Option>
                        <Select.Option key={'GITHUB'} value={'GITHUB'}>github</Select.Option>
                        <Select.Option key={'GITEE'} value={'GITEE'}>gitee</Select.Option>
                    </Select>
                </Form.Item>
                {(accountType !== 'anonymous') &&
                <Form.Item name={'account'} label={'账号'} required={true}
                           rules={[
                               {
                                   required: (accountType !== 'anonymous') && true,
                                   message: '请输入对应渠道的账号'
                               },
                               accountType === 'QQ' ?
                                   {
                                       pattern: /^[1-9]\d{4,10}$/,
                                       message: 'qq号不正确'
                                   }
                                   :
                                   {
                                       pattern: /^[a-zA-Z0-9_-]{1,39}$/,
                                       message: '账号格式不正确'
                                   }
                           ]}
                >
                    <div>
                        <Input style={{width: "70%"}} placeholder={'登陆账号'}/>
                        <Divider type={"vertical"}/>
                        <Button type={"primary"} htmlType={"button"} onClick={getInfo}>自动填充</Button>
                    </div>
                </Form.Item>}
                <Form.Item name={'nickname'} label={'昵称'} required={true}
                           rules={[
                               {
                                   required: true,
                                   message: '请输入昵称'
                               }
                           ]}
                >
                    <Input placeholder={'在非匿名情况下可以自动填入'}/>
                </Form.Item>
                <Form.Item name={'avatar'} label={'头像'} required={true}>
                    <Input placeholder={'在非匿名情况下可以自动填入'}/>
                </Form.Item>
                <Form.Item name={'email'} label={'邮箱'} required={false}
                           rules={[
                               {
                                   pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'/,
                                   message: '邮箱格式不正确'
                               }
                           ]}
                >
                        <Input placeholder={'用于订阅评论回复'}/>
                </Form.Item>
                <Form.Item name={'website'} label={'个人站点'} required={false}>
                    <Input placeholder={'博客,选择git、gitee时会自动填入个人git、gitee站点'} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Visitor;