import {BlogItemInfo, QueryType} from "@/model/blog";
import {Link} from "react-router-dom";
import {BLACK, GREEN} from "@/constans/color";
import {
    CalendarOutlined,
    ClockCircleOutlined,
    EditOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import {Badge, Button, Tag} from "antd"
import markdown from "@/utils/markdown";
import {ISO_TO_STR} from "@/utils/date";
import TagItem from "@/components/tag/item";
import {useCacheContext} from "@/components/context";

const BlogItem = ({data}: { data: BlogItemInfo }) => {

    const {tagList} = useCacheContext();

    return (
        <div className="ui padded attached segment m-padded-tb-large m-margin-bottom-big m-box">
            <div className={'ui grid m-margin-lr'}>
                <div className={'row m-padded-tb-small'}>
                    <h2 className={'ui header m-center m-scaleup'}>
                        <Link style={{color: BLACK}} to={`/blogs/${data.id}`}>{data.title}</Link>
                    </h2>
                </div>
                <div className="row m-padded-tb-small">
                    <div className="ui horizontal link list m-center">
                        <div className="item m-datetime">
                            <CalendarOutlined/>
                            <span>
                                {ISO_TO_STR(data.createTime)}
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
                            <span>阅读时长≈{Math.round(data.words/300) + 1}分</span>
                        </div>
                    </div>
                </div>
                <Badge.Ribbon style={{marginLeft: '-1.6em', fontSize: 20}}
                              text={
                                  <Link to={`/home#type=${QueryType.CATEGORY}&key=${data.category?.id}`}>
                                      {data.category?.name}
                                  </Link>
                              }
                              color={GREEN} placement={"start"}>
                    <div/>
                </Badge.Ribbon>
                <div className={'markdown m-padded-tb-small'} style={{marginTop: '2em'}} dangerouslySetInnerHTML={{__html: markdown.parse(data.description).html}}/>
                <div className="ui m-center">
                    <Link to={`/blogs/${data.id}`}><Button type={"primary"} htmlType={"button"} className={'blog-item-button'}>阅读全文</Button></Link>
                </div>
                <div className="ui section divider" style={{width: '100%'}}/>
                <div className="row m-padded-tb-no">
                    {data.tagList.map(item => <TagItem key={item.id} data={item}/>)}
                </div>
            </div>
        </div>
    );
}

export default BlogItem