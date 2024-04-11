import {Tabs} from "antd";
import IntroductionView from "@/views/site/introduction";
import AccountEdit from "@/views/site/account";
import HobbyEdit from "@/views/site/hobby";
import SiteEdit from "@/views/site/site";

const SiteView = () => {


    const items = [
        {
            key: 'introduction',
            label: '简介',
            children: <IntroductionView/>
        },
        {
            key: 'account',
            label: '个人账号',
            children: <AccountEdit/>
        },
        {
            key: 'hobby',
            label: '个人爱好',
            children: <HobbyEdit/>
        },
        {
            key: 'site',
            label: '网站设置',
            children: <SiteEdit/>
        }
    ];

    return (
        <div>
            <Tabs
                items={items}
                defaultActiveKey="introduction"
                centered={true}
                type={"card"}
            />
        </div>
    )
};

export default SiteView;