import {BlogTag, QueryType} from "@/model/blog";
import {Tag} from "antd";
import {Link} from "react-router-dom";

const TagItem = ({data}: {data: BlogTag}) => {
    return (
        <Link to={`/home#type=${QueryType.TAG}&key=${data.id}`}><Tag style={{background: data.color, fontWeight: 500}}>{data.name}</Tag></Link>
    )
};

export default TagItem;