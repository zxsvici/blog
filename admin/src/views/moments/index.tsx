import {ColumnsType} from "antd/lib/table";
import {Button, message, Pagination, Space, Switch, Table} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {MomentInfo} from "@/model/moment";
import {DEFAULT_PAGE_INFO} from "@/constants/default";
import {PageInfo, PageRes} from "@/model";
import viciRequest from "@/config/axios";

const MomentList = () => {

    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "日期",
            dataIndex: "createTime",
            key: "createTime",
            render: text => text.replace('T', ' ')
        },
        {
            title: "内容",
            dataIndex: "content",
            key: "content"
        },
        {
            title: "点赞",
            dataIndex: "likes",
            key: "likes"
        },
        {
            title: "是否公开",
            dataIndex: "publicFlag",
            key: "publicFlag",
            render: (text, record) => <Switch checked={text} onChange={(checked) => publicChange(record.id, checked)}/>
        },
        {
            title: "操作",
            dataIndex: "actions",
            key: "actions",
            fixed: "right", // 将该列固定在表格的右侧
            render: (text, record) => (
                // 自定义操作列的渲染函数
                <Space>
                    <Button onClick={() => navigate(`/moment/edit/${record.id}`)} style={{background: "transparent", border: 0}}>
                        编辑
                    </Button>
                    <Button danger={true} onClick={() => remove(record.id)} style={{background: "transparent", border: 0}}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ] as ColumnsType<any>;

    const navigate = useNavigate();
    const [list, setList] = useState<MomentInfo[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>({...DEFAULT_PAGE_INFO});

    useEffect(() => {
        query(pageInfo.pageNo, pageInfo.pageSize);
    }, [])

    const query = (pageNo: number, pageSize: number) => {
        viciRequest.get(`/admin/moments/page?timestamp=${Date.now()}&pageNo=${pageNo}&pageSize=${pageSize}`).then((res: any) => {
            let response = res as PageRes<MomentInfo>;
            setList(response.list);
            setPageInfo(response.page);
        });
    }

    const publicChange = (id: number, status: boolean) => {
        viciRequest.get(`/admin/moments/public/${id}?status=${status}`).then(res => {
            message.info(`${status ? '公开' : '隐藏'}成功!`);
            query(pageInfo.pageNo, pageInfo.pageSize);
        })
    }

    const remove = (id) => {
        viciRequest.get(`/admin/moments/delete/${id}`).then(res => {
            message.info("删除成功!");
            query(pageInfo.pageNo, pageInfo.pageSize);
        })
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={list}
                rowKey={record => record.id}
                pagination={false}
            />
            <Pagination
                current={pageInfo.pageNo}
                total={pageInfo.total}
                pageSize={pageInfo.pageSize}
                onChange={query}
                showQuickJumper={true}
                showSizeChanger={true}
                showPrevNextJumpers={true}
                showTotal={total => `共 ${total} 条`}
                style={{textAlign: "center"}}
            />
        </>
    )
}

export default MomentList;