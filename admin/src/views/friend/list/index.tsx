import {Link} from "react-router-dom";
import {Avatar, message, Pagination, Space, Switch, Table} from "antd";
import {useEffect, useState} from "react";
import {DEFAULT_PAGE_INFO} from "@/constants/default";
import {PageInfo, PageRes} from "@/model";
import viciRequest from "@/config/axios";
import {Friend} from "@/model/friend";

const FriendList = () => {
    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            editable: true,
            render: (text, record) => <Link to={record.website} target={"_blank"}>{text}</Link>
        },
        {
            title: "头像",
            dataIndex: "avatar",
            key: "avatar",
            render: text => <Avatar src={text} size={"small"}/>
        },
        {
            title: "个签",
            dataIndex: "signature",
            key: "signature",
            width: '40%',
            render: text => <div style={{wordBreak: "break-word"}}>{text}</div>
        },
        {
            title: '是否展示',
            dataIndex: "deleteFlag",
            key: "deleteFlag",
            render: (text, record) => <Switch checked={!text} onChange={(checked) => enable(record.id, checked)}/>
        },
    ];

    const [list, setList] = useState<Friend[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>({...DEFAULT_PAGE_INFO});

    useEffect(() => {
        query(pageInfo.pageNo, pageInfo.pageSize);
    }, []);

    const query = (pageNo: number, pageSize: number) => {
        viciRequest.get(`/admin/friends/page?pageNo=${pageNo}&pageSize=${pageSize}`).then((res: any) => {
            const pageRes = res as PageRes<Friend>;
            setList(pageRes.list);
            setPageInfo(pageRes.page);
        });
    }

    const enable = (id: number, status: boolean) => {
        viciRequest.get(`/admin/friends/enable/${id}?status=${status}`).then((res: any) => {
            const newList: Friend[] = [...list];
            const find = newList.find(item => item.id === id);
            find.deleteFlag = !status;
            setList(newList);
        }).catch(e => {
            message.error(`${status ? '显示' : '隐藏'}失败...`);
        })
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={list}
                rowKey={record => record.id}
            />
            <Pagination
                current={pageInfo.pageNo}
                pageSize={pageInfo.pageSize}
                total={pageInfo.total}
                showTotal={(total) => `共${total}条`}
                showQuickJumper={true}
                showSizeChanger={true}
                onChange={query}
                style={{textAlign: "center"}}
            />
        </div>
    )
}

export default FriendList;