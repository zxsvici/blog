import CommentList from "@/components/comment";
import {Tabs} from "antd";
import PageConfigEdit from "@/components/page-config";
import {BaseConfigType} from "@/model/config";

const AboutView = () => {

    const items = [
        {
            key: 'config',
            label: '配置',
            children: <PageConfigEdit type={BaseConfigType.ABOUT}/>
        },
        {
            key: 'comment',
            label: '评论管理',
            children: <CommentList bid={'-2'}/>
        },
    ]

    return (
        <div>
            <Tabs
                items={items}
                centered={true}
                type={"card"}
                defaultValue={'config'}
            />
        </div>
    )
}

export default AboutView;