import {Tabs} from "antd";
import FriendList from "@/views/friend/list";
import CommentList from "@/components/comment";
import PageConfigEdit from "@/components/page-config";
import {BaseConfigType} from "@/model/config";

const FriendView = () => {

    const items = [
        {
            key: 'config',
            label: '配置',
            children: <PageConfigEdit type={BaseConfigType.FRIEND}/>
        },
        {
            key: 'list',
            label: '列表管理',
            children: <FriendList/>
        },
        {
            key: 'comment',
            label: '评论管理',
            children: <CommentList bid={'-1'}/>
        }
    ]

    return (
        <div style={{background: "white"}}>
            <Tabs
                defaultActiveKey="config"
                centered
                type={"card"}
                items={items}
            />
        </div>
    )
}

export default FriendView;