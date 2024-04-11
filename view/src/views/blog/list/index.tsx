import {useEffect, useMemo, useState} from "react";
import baseRequest from "@/config/axios";
import {useLocation} from "react-router-dom";
import {hashToObj} from "@/utils/url";
import {BlogItemInfo, BlogListQueryInfo, QueryType} from "@/model/blog";
import BlogItem from "@/components/blog/item";
import {DEFAULT_PAGE_INFO, PageInfo, PageRes} from "@/model";
import {Divider, Pagination} from "antd";
import {useCacheContext} from "@/components/context";

const BlogList = () => {

    const location = useLocation();
    const [list, setList] = useState<BlogItemInfo[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>(DEFAULT_PAGE_INFO);
    const [queryParams, setQueryParams] = useState({type: 0, key: ''});
    const [loading, setLoading] = useState<boolean>(false);
    const {categories, tagList} = useCacheContext();

    useEffect(() => {
        let params = hashToObj(location.hash) as { type: string, key: string };
        setQueryParams({type: params.type ? parseInt(params.type) : QueryType.ALL, key: params.key});
        setLoading(true);
    }, [location]);

    useEffect(() => {
        if (loading) {
            query();
        }
    }, [queryParams, pageInfo])

    const query = () => {
        setLoading(false);
        let url = `blogs?page=${pageInfo.pageNo}&size=${pageInfo.pageSize}&timestamp=${Date.now()}`;
        if (queryParams.type !== QueryType.ALL) {
            url += `&type=${queryParams.type}&key=${queryParams.key}`;
        }
        baseRequest.get(url).then((res: any) => {
            let data = res as PageRes<BlogItemInfo>;
            setList(data.list);
            setPageInfo(data.page);
        }).catch(e => {
            setList([])
        }).finally(() => {

        })
    }
 
    const pageClick = (page: number, size: number) => {
        setLoading(true);
        setPageInfo(pre => ({...pre, pageNo: page, pageSize: size}));
    }

    const renderListHeader = useMemo(() => {
        let key = '';
        let value = '';
        switch (queryParams.type) {
            case QueryType.ALL:
                return '';
            case QueryType.TAG:
                key = '标签';
                const tag = tagList.find(tag => tag.id === parseInt(queryParams.key));
                value = tag.name;
                break;
            case QueryType.CATEGORY:
                key = '分类'
                const category = categories.find(category => category.id === parseInt(queryParams.key));
                value = category.name;
                break;
            default:
                key = '关键词';
                value = queryParams.key;
        }
        return <div className={'ui top segment'} style={{textAlign: "center"}}>
            <h2 style={{fontSize: 25, fontWeight: 500}}>{key} {value} 下的文章</h2>
        </div>;
    }, [queryParams, tagList, categories]);

    return (
        <div>
            {renderListHeader}
            <div>
                {list.map(item => {
                    return <BlogItem key={item.id} data={item}/>
                })}
            </div>

            <Pagination defaultPageSize={10}
                        total={pageInfo.total}
                        pageSize={pageInfo.pageSize}
                        current={pageInfo.pageNo}
                        onChange={pageClick}
                        showTotal={(total) => `共${total}条`}
                        showQuickJumper={true}
                        showSizeChanger={true}
                        style={{textAlign: "center"}}
            />
        </div>
    )
}

export default BlogList;