import {useEffect, useState} from "react";
import {AboutIntroduction} from "@/model/self-introduction";
import baseRequest from "@/config/axios";
import CommentList from "@/components/comment/list";
import markdown from "@/utils/markdown";

const About = () => {

    const [data, setData] = useState<AboutIntroduction>({commentEnable: false, content: ""});

    useEffect(() => {
        baseRequest.get('/about').then((res: any) => {
            const response = res as {commentEnable: boolean, content: string};
            response.content = markdown.parse(response.content).html;
            setData(response);
        }).catch(e => {
            setData({
                content: '',
                commentEnable: false
            })
        }).finally(() => {

        })
    }, []);

    return (
        <div>
            <div  className={'ui top attached segment m-padded-lr-big'}>
                <div className={"markdown"} dangerouslySetInnerHTML={{__html: data.content}}/>
            </div>
            <div  className={'ui bottom teal attached segment threaded comments'}>
                {data.commentEnable && <CommentList blogId={-2}/>}
            </div>
        </div>
    );
}

export default About;