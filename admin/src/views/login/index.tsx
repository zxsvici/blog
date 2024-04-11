import { Button, Checkbox, Form, Input } from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import viciRequest from "@/config/axios";
import {useNavigate} from "react-router-dom";

interface LoginReq {
    username: string,
    password: string
}

const Login = () => {

    const [editForm] = Form.useForm<LoginReq>();
    const navigate = useNavigate();

    const login = (req: LoginReq) => {
        viciRequest.post('/login', req).then((res: any) => {
            localStorage.setItem('vici-token', res);
            navigate("/");
        });
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(/img/kdl2.jpg)',
            backgroundSize: "cover"
        }}>
            <label style={{fontSize: 30, fontWeight: 'bold', color: "white"}}>后台管理</label>
            <Form
                name="basic"
                form={editForm}
                style={{maxWidth: '800px', minWidth: '400px', marginTop: '1em'}}
                initialValues={{remember: true}}
                onFinish={login}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input placeholder={'账户'} addonBefore={<UserOutlined size={30} style={{color: 'gray'}}/>}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password placeholder={'密码'} addonBefore={<LockOutlined size={30} style={{color: 'gray'}}/>}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;