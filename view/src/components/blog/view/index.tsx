import {useEffect, useState} from "react";
import CommentList from "@/components/comment/list";
import {BlogInfo, QueryType} from "@/model/blog";
import BlogViewFooter from "@/components/blog/footer";
import {Tag, Badge} from "antd";
import markdown from "@/utils/markdown";
import {useCacheContext} from "@/components/context";
import baseRequest from "@/config/axios";
import {Link, useLocation, useParams} from "react-router-dom";
import {GREEN} from "@/constans/color";
import {CalendarOutlined, ClockCircleOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import TagItem from "@/components/tag/item";

const BlogView = () => {

    const {id} = useParams();
    const location = useLocation();

    const [data, setData] = useState<BlogInfo>({
        content: "",
        createTime: "",
        description: "",
        id: 0,
        modifyTime: "",
        tagList: [],
        title: "",
        visits: 0,
        words: 0,
        topFlag: false,
        commentFlag: false
    });
    const {setTocItems} = useCacheContext();

    useEffect(() => {
        let temp: BlogInfo;
        baseRequest.get(`/blogs/${id}`).then((res: any) => {
            temp = res as BlogInfo;
        }).catch(e => {
            // temp = {...testBlog}
        }).finally(() => {
            const parse = markdown.parse(temp.content);
            setData({...temp, content: parse.html});
            setTocItems(parse.tocItems);
        });
    }, [location]);

    return (
        <div>
            <div className={'ui padded attached segment m-padded-tb-large'}>
                <Badge.Ribbon style={{marginLeft: '-1.25em', fontSize: 20}}
                              text={
                                  <Link to={`/home#type=${QueryType.CATEGORY}&key=${data.category?.id}`}>
                                      {data.category?.name}
                                  </Link>
                              }
                              color={GREEN} placement={"start"}>
                    <div><br/></div>
                </Badge.Ribbon>
                <div className={'ui middle aligned mobile reversed stackable'}>
                    <div className="row m-padded-tb-small" style={{textAlign: "center"}}>
                        <h1 className={'ui header m-center'}>{data.title}</h1>
                    </div>
                    <div className="row m-padded-tb-small" style={{textAlign: "center"}}>
                        <div className="ui horizontal link list m-center">
                            <div className="item m-datetime">
                                <CalendarOutlined/>
                                <span>
                                {data.createTime.replace('T', ' ')}
                            </span>
                            </div>
                            <div className="item m-views">
                                <EyeOutlined/>
                                <span>{data.visits}</span>
                            </div>
                            <div className="item m-common-black">
                                <EditOutlined/>
                                <span>字数≈{data.words}字</span>
                            </div>
                            <div className="item m-common-black">
                                <ClockCircleOutlined/>
                                <span>阅读时长≈{Math.round(data.words / 300) + 1}分</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'markdown attached m-padded-tb-small content'}
                     dangerouslySetInnerHTML={{__html: data.content}}/>
            </div>
            <div className={'ui attached segment content'}>
                {data.tagList.map(item => <TagItem key={item.id} data={item}/>)}
            </div>
            <BlogViewFooter createTime={data.createTime} modifyTime={data.modifyTime}/>
            {data.commentFlag && <div className={'ui bottom teal attached segment threaded comments'}>
                <CommentList blogId={data.id}/>
            </div>}
        </div>

    )
}

export default BlogView;