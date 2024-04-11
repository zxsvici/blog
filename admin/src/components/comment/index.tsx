import {Avatar, Pagination, Space, Switch, Table} from "antd";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {CommentTreeNode} from "@/model/comment";
import {DEFAULT_PAGE_INFO} from "@/constants/default";
import {PageInfo, PageRes} from "@/model";
import viciRequest from "@/config/axios";

const CommentList = ({bid} : {bid: string}) => {
    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "头像",
            dataIndex: "avatar",
            key: "avatar",
            render: (text) => <Avatar src={text}/>
        },
        {
            title: "昵称",
            dataIndex: "nickname",
            key: "nickname",
            render: (text, record) => record.website ? <Link to={record.website} target={"_blank"}>{text}</Link> : text,
        },
        {
            title: "评论内容",
            dataIndex: "content",
            key: "content",
            width: '40%',
            render: text => <div style={{wordBreak: "break-word"}}>{text}</div>
        },
        {
            title: "回复数量",
            key: "content",
            render: (text, record) => record.children.length
        },
        {
            title: "评论时间",
            dataIndex: "createTime",
            key: "createTime"
        },
        {
            title: "是否展示",
            dataIndex: "deleteFlag",
            key: "deleteFlag",
            render: (text, record) => <Switch checked={!text} onChange={(checked) => statusChange(record.id, checked)} style={{background: !text ? "orange" : "gray"}}/>
        },
        {
            title: "操作",
            render: (text, record) => <Space>
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        }
    ];
    
    const [list, setList] = useState<CommentTreeNode[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>({...DEFAULT_PAGE_INFO});
    
    useEffect(() => {
        query(pageInfo.pageNo, pageInfo.pageSize);
    }, [bid]);

    const query = (pageNo: number, pageSize: number) => {
        viciRequest.get(`/admin/comments/${bid}/page?pageNo=${pageNo}&pageSize=${pageSize}`).then((res: any) => {
            const response = res as PageRes<CommentTreeNode>;
            setList(response.list);
            setPageInfo(response.page);
        })
    }
    
    const statusChange = (id: number, status: boolean) => {
        viciRequest.get(`/admin/comments/${id}/enable?enableFlag=${status}`).then(res => {
            query(pageInfo.pageNo, pageInfo.pageSize);
        })
    }
    
    return (
        <div style={{background: "white"}}>
            <Table
                columns={columns}
                dataSource={list}
                rowKey={record => record.id}
                pagination={false}
            />
            <Pagination
                current={pageInfo.pageNo}
                pageSize={pageInfo.pageSize}
                total={pageInfo.total}
                showTotal={total => `共${total}条`}
                showSizeChanger={true}
                showQuickJumper={true}
                onChange={query}
                style={{textAlign: "center"}}
            />
        </div>
    )
}

export default CommentList;