import {useEffect, useState, Fragment} from "react";
import {CommentView} from "@/model/comment";
import baseRequest from "@/config/axios";
import {Avatar, Button, Divider, Pagination} from "antd";
import CommentItem from "@/components/comment/item";
import {PageInfo, PageRes} from "@/model";
import CommentEdit from "@/components/comment/edit";

const CommentList = ({blogId} : {blogId: number}) => {

    const [commentList, setCommentList] = useState<(CommentView)[]>([]);

    const [replyRootId, setReplyRootId] = useState<number>(-1);
    const [replyParent, setReplyParent] = useState<CommentView>();
    const [pageInfo, setPageInfo] = useState<PageInfo>({pageNo: 1, pageSize: 10, pages: 0, total: 0});
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        query();
    }, [blogId]);

    useEffect(() => {
        if(loading) {
            query();
        }
    }, [loading]);

    const pageChange = (page: number, size: number) => {
        setPageInfo(pre => ({...pre, pageNo: page, pageSize: size}));
        setLoading(true);
    }

    const query = () => {
        baseRequest.get(`/comments?blogId=${blogId}`).then((res: any) => {
            const response = res as PageRes<CommentView>;
            setCommentList(response.list);
            setLoading(false);
            setPageInfo(response.page);
        }).catch(e => {
            setCommentList([]);
        }).finally(() => {

        })
    }

    return (
        <div>
            <div className={'ui dividing header'}>
                Comments
            </div>
            <CommentEdit blogId={blogId} reload={() => setLoading(true)}/>
            <div className={'ui attached content'}>
                {commentList ? commentList.map(item =>
                    <div key={item.id} >
                        <CommentItem data={item} setReplyRootId={setReplyRootId} setReplyParent={setReplyParent}/>
                        {replyRootId === item.id && <CommentEdit parent={replyParent} blogId={blogId} reload={() => setLoading(true)}/>}
                        <Divider/>
                    </div>
                ) : <div>前排待抢</div>}
            </div>
            <Pagination defaultPageSize={10}
                        total={pageInfo.total}
                        pageSize={pageInfo.pageSize}
                        current={pageInfo.pageNo}
                        onChange={pageChange}
                        showTotal={(total) => `共${total}条`}
                        showQuickJumper={true}
                        showSizeChanger={true}
                        style={{textAlign: "center"}}
            />
        </div>
    );
};

export default CommentList;