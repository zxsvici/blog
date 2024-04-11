import SelfMenu from "../components/layout/menu/index";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import {Avatar, Breadcrumb} from "antd";
import Sider from "antd/es/layout/Sider";
import {useState, Suspense} from "react";
import {Outlet} from "react-router-dom"
import {SelfCacheProvider} from "@/components/context";

const Home = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [labelArr, setLabelArr] = useState<string[]>(['视图']);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{height: 64, background: 'rgba(255, 255, 255, 0.2)'}}/>
                <SelfMenu setLabelArr={setLabelArr}/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0, background: "white", display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
                    <Breadcrumb style={{margin: '16px 16px', width: '80%'}}>
                        {labelArr && labelArr.map(item => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)}
                    </Breadcrumb>
                    <Avatar src={'/img/avatar.jpg'} size={"large"} style={{float: 'right', right: '3%'}}/>
                </Header>
                <SelfCacheProvider>
                    <Content style={{margin: '16px 16px', background: 'whitesmoke'}}>
                        <Suspense fallback={<div>Loading...</div>}><Outlet/></Suspense>
                    </Content>
                </SelfCacheProvider>
                <Footer style={{textAlign: 'center', padding: 0, lineHeight: '48px'}}>Ant Design ©2023 Created by Ant
                    UED</Footer>
            </Layout>
        </Layout>
    )
}

export default Home