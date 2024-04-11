import {Collapse, Tag} from "antd";
import {Link} from "react-router-dom";
import {BlogTag, QueryType} from "@/model/blog";
import {useCacheContext} from "@/components/context";
import TagItem from "@/components/tag/item";

const TagLibrary = () => {

    const {tagList} = useCacheContext();

    return (
        <div style={{zIndex: 10}}>
            <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel header="标签云" key="1">
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                    }}>
                        {tagList.map(tag => {
                            return <div key={tag.name}
                                style={{
                                marginTop: '0.5em'
                            }}>
                                <TagItem data={tag}/>
                            </div>
                        })}
                    </div>
                </Collapse.Panel>
            </Collapse>
        </div>
    )
}

export default TagLibrary;