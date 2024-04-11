import {useEffect, useState} from "react";
import {Moment} from "@/model/moment";
import baseRequest from "@/config/axios";
import {DEFAULT_PAGE_INFO, PageInfo, PageRes} from "@/model";
import {message, Pagination} from "antd";
import MomentItem from "@/views/moments/item";
import it from "node:test";

const statusMapKey = "momentStatusMap";

const Moments = () => {
    const [data, setData] = useState<Moment[]>([]);
    const [likeList, setLikeList] = useState<number[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>(DEFAULT_PAGE_INFO);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let likeIdList = JSON.parse(localStorage.getItem('vici_likeList')) as number[];
        if(likeIdList) {
            setLikeList(likeIdList);
        }
        queryData();
    }, []);

    useEffect(() => {
        if (loading) {
            queryData();
        }
    }, [pageInfo]);


    const queryData = () => {
        let temp: Moment[] = [];
        baseRequest.get(`/moments?page=${pageInfo.pageNo}&size=${pageInfo.pageSize}`).then((res: any) => {
            const response: PageRes<Moment> = res as PageRes<Moment>;
            temp = response.list;
            setLoading(false);
            setPageInfo(response.page);
        }).catch(e => {

        }).finally(() => {
            setData(temp);
        });
    }

    const like = (id: number) => {
        setLikeList(pre => [...pre, id]);
        if(likeList.includes(id)) {
            message.info('你已经点赞过了');
            return;
        }
        baseRequest.get(`/moments/${id}/like`).then((res: any) => {
            let flag = res as boolean;
            if(flag) {
                const list = [...likeList, id];
                setLikeList(list);
                localStorage.setItem('vici_likeList', JSON.stringify(list));
            }else {
                throw new Error();
            }
            const list: Moment[] = [];
            data.forEach(item => {
                if(item.id === id) {
                    item.likes++;
                }
                list.push(item);
            });
            setData(list);
        });
    };

    const pageClick = (page: number, size: number) => {
        setLoading(true);
        setPageInfo(pre => ({...pre, pageNo: page, pageSize: size}));
    }

    const sizeChange = (size: number) => {
        setLoading(true);
        setPageInfo(pre => ({...pre, pageSize: size}));
    }

    return (
        <div>
            <div className={'ui top segment'} style={{textAlign: "center"}}>
                <h2 className="m-text-500">我的动态</h2>
            </div>
            <div>
                {data.map(item => {
                    return (
                        <MomentItem key={item.id} data={item} status={likeList.includes(item.id)} like={like}/>
                    )
                })}
            </div>
            <Pagination
                style={{
                    marginTop: '3em',
                    textAlign: "center"
                }}
                current={pageInfo.pageNo}
                pageSize={pageInfo.pageSize}
                total={pageInfo.total}
                onChange={pageClick}
                showTotal={(total) => `共${total}条`}
                showSizeChanger={true}
                showQuickJumper={true}
                onShowSizeChange={sizeChange}
            />
        </div>
    )
};

export default Moments;