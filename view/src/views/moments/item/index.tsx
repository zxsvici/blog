import {Moment} from "@/model/moment";
import {Avatar} from "antd";
import markdown from "@/utils/markdown";
import {format, parseISO} from "date-fns";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {RED} from "@/constans/color";

const MomentItem = ({data, status, like}: { data: Moment, status, like: Function }) => {
    return (
        <div className="ui padded attached segment m-padded-tb-large m-margin-bottom-big m-box">
            <div className={'content markdown'}
                 dangerouslySetInnerHTML={{__html: markdown.parse(data.content).html}}/>
            <div className={'ui attached positive bottom'}>
                                    <span className={'left floated'} style={{position: "absolute", left: '3em'}}>
                                        {format(parseISO(data.createTime), 'yyyy-MM-dd hh:mm:ss')}
                                    </span>
                <span className={'right floated'} style={{position: 'absolute', right: '7em'}}>
                                        {status ?
                                            <HeartFilled size={5} onClick={() => like(data.id)} style={{color: RED}}/> :
                                            <HeartOutlined size={5} onClick={() => like(data.id)}/>}{data.likes}
                                    </span>
            </div>
        </div>
    )
}

export default MomentItem;