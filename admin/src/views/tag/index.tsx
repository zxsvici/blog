import {Button, message, Space, Switch, Table} from "antd";
import TagEdit from "@/views/tag/edit";
import {useEffect, useState} from "react";
import {PageInfo, PageRes} from "@/model";
import {DEFAULT_PAGE_INFO} from "@/constants/default";
import {TagInfo} from "@/model/tag";
import viciRequest from "@/config/axios";
import {ColumnsType} from "antd/es/table/interface";

const TagList = () => {

    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "颜色",
            dataIndex: "color",
            key: "color",
            render: (color: string, record) => {
                return <div style={{height: '20px', width: '40px', background: color}}/>
            }
        },
        {
            title: "操作",
            dataIndex: "actions",
            key: "actions",
            fixed: "right", // 将该列固定在表格的右侧
            render: (text, record) => (
                // 自定义操作列的渲染函数
                <Space>
                    <a onClick={() => edit(record)}>
                        编辑
                    </a>
                    <a onClick={() => remove(record.id)} style={{color: 'red'}}>
                        删除
                    </a>
                    {/* 其他按钮或数据 */}
                </Space>
            ),
        },
    ] as ColumnsType<any>;

    const [pageInfo, setPageInfo] = useState<PageInfo>({...DEFAULT_PAGE_INFO});
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [current, setCurrent] = useState<TagInfo>();
    const [list, setList] = useState<TagInfo[]>([]);

    useEffect(() => {
        query(pageInfo.pageNo, pageInfo.pageSize);
    }, [])

    const query = (pageNo: number, pageSize: number) => {
        viciRequest.get(`/admin/tags/page/list?page=${pageNo}&size=${pageSize}`).then((response: any) => {
            const res = response as PageRes<TagInfo>;
            setList(res.list);
            setPageInfo(res.page)
        })
    }

    const edit = (tag?: TagInfo) => {
        setCurrent(tag);
        setShowEdit(true);
    }

    const editCancel = () => {
        setShowEdit(false);
        query(pageInfo.pageNo, pageInfo.pageSize);
    }

    const remove = (id: number) => {
        viciRequest.delete(`/admin/tags/${id}`).then(res => {
            message.info("删除成功!");
            query(pageInfo.pageNo, pageInfo.pageSize);
        })
    }

    return (
        <div style={{height: '100%', overflow: "auto"}}>
            <Button type="primary" onClick={() => edit()}>添加标签</Button>
            <TagEdit
                visible={showEdit}
                onCancel={editCancel}
                data={current}
            />
            <Table
                rowKey={(record => record.id)}
                dataSource={list}
                columns={columns}
                pagination={{
                    total: pageInfo?.total,
                    showTotal: (total) => `共${total}条`,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    onChange: query,
                }}
            />
        </div>
    )
}

export default TagList;