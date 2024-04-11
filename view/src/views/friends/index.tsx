import {useEffect, useState} from "react";
import {FriendsRes} from "@/model/friend";
import baseRequest from "@/config/axios";
import CommentList from "@/components/comment/list";
import {Avatar, Card} from "antd";
import {mouseEnter, mouseLeave} from "@/utils/event";
import {
    BLUE,
    CYAN,
    GREEN,
    LIGHT_PINK,
    MEDIUM_SEA_GREEN,
    ORANGE,
    PURPLE,
    SEA_GREEN,
    TURQUOISE,
    YELLOW
} from "@/constans/color";
import markdown from "@/utils/markdown";

const Friends = () => {

    const [data, setData] = useState<FriendsRes>({content: '', commentEnable: false, list: []});

    useEffect(() => {
        baseRequest.get('/friends').then((res: any) => {
            const response = res as FriendsRes;
            response.content = markdown.parse(response.content).html;
            setData(response);
        }).catch(e => {
            console.log(`friend error is ${e}`)
            setData({
                content: '',
                commentEnable: false,
                list: []
            });
        }).finally(() => {

        });
    }, []);

    const getRandomColor = () => {
        const colors = [
            ORANGE,
            YELLOW,
            GREEN,
            BLUE,
            PURPLE,
            LIGHT_PINK,
            CYAN,
            MEDIUM_SEA_GREEN,
            TURQUOISE,
            SEA_GREEN,
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    return (
        <div>
            <div className="ui top attached segment" style={{textAlign: "center"}}>
                <h1 className="m-text-500 m-big-fontsize">小伙伴们</h1>
            </div>
            <div className="ui attached segment">
                <div className="ui link three doubling cards">
                    {data.list.map(item => {
                        return (
                            <a key={item.id}
                               href={item.website}
                               target={"_blank"}
                               rel={"external nofollow noopener"}
                               className={"card"}
                               style={{backgroundColor: getRandomColor(), textAlign: "center", wordWrap: "break-word"}}>
                                <div className="content">
                                    <Avatar src={item.avatar} size={75}/>
                                    <div className="header">{item.name}</div>
                                    <div className="description" >{item.signature}</div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
            <div className={'ui attached segment markdown'} dangerouslySetInnerHTML={{__html: data.content}}/>
            <div  className={'ui bottom teal attached segment threaded comments'}>
                {data.commentEnable && <CommentList blogId={-1}/>}
            </div>
        </div>
    );
}

export default Friends;