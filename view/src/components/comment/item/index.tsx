import {CommentView} from "@/model/comment";
import {Avatar, Button} from "antd";
import {Link} from "react-router-dom";
import Icon, {
    CalendarOutlined,
    CommentOutlined,
    DislikeOutlined,
    LikeOutlined,
    RightOutlined,
    UserOutlined
} from "@ant-design/icons";
import {BLUE_GRAY, GRAY, LIGHT_BLUE, SKY_BLUE} from "@/constans/color";
import {ISO_TO_STR} from "@/utils/date";

const CommentItem = ({data, setReplyRootId, setReplyParent}: { data: CommentView, setReplyRootId: Function, setReplyParent: Function}) => {

    const renderItem = (item: CommentView) => {
        return (
            <div key={item.id} className={'comment wrap'}
                 style={{
                     display: "flex",
                     flexDirection: 'column',
                     padding: '0.5em 0.5em',
                     fontSize: 15,
                     marginLeft: item.rootId !== -1 ? '1.5em' : '0'
                 }}>
                <span className={'anchor'}/>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <div>
                        <Avatar src={item.avatar}/>
                    </div>
                    <div className={'content'}>
                        {item.website ? <Link to={item.website} target={"_blank"}
                                              rel="external nofollow noopener">{item.nickname}</Link>
                            : <label style={{fontWeight: 600}}>{item.nickname}</label>}
                        {/*如果是回复，则需要添加回复某某*/}
                        {item.parentNickname && <span style={{color: "GrayText"}}> 回复 </span>}
                        {item.parentNickname && <label style={{fontWeight: 600}}>{item.parentNickname}</label>}
                        <div className={'content'} style={{width: '80%', wordBreak: "break-word"}}>{item.content}</div>
                        <div>
                            <strong className="date" style={{color: GRAY, fontSize: 12}}>{ISO_TO_STR(item.createTime)}</strong>
                            <Button type={"primary"} htmlType={"button"} size={"small"}
                                    style={{fontSize: 12, color: "gray", background: "transparent"}}
                                    onClick={() => {setReplyRootId(data.id); setReplyParent(item);}}>
                                回复</Button>
                        </div>
                    </div>
                </div>
                {item.children && item.children.map(renderItem)}
            </div>
        )
    };

    return (
        <div>
            {renderItem(data)}
        </div>
    )
}

export default CommentItem;