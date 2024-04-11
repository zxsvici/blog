import {Button, Collapse, Form, Input, Select, Table, Tag, Image, message, Space, Switch} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useSelfCacheContext} from "@/components/context";
import {useEffect, useState, Dispatch as ReactDispatch, SetStateAction} from "react";
import {PageInfo, PageRes} from "@/model";
import {BlogInfo, BlogQuery} from "@/model/blog";
import {DEFAULT_PAGE_INFO} from "@/constants/default";
import viciRequest from "@/config/axios";
import {useNavigate} from "react-router-dom";
import {ColumnsType} from "antd/lib/table";

const BlogList = () => {

    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "导图",
            dataIndex: "headerImage",
            key: "headerImage",
            render: text => (
                <Image src={text} width={"80px"} height={"40px"}/>
            )
        },
        {
            title: "分类",
            dataIndex: "categoryId",
            key: "categoryId",
            render: text => categoryMap.get(text).name
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            render: (text) => text ? text.replace('T', ' ') : '',
        },
        {
            title: "最后更新",
            dataIndex: "updateTime",
            key: "updateTime",
            render: (text) => text ? text.replace('T', ' ') : '',
        },
        {
            title: "是否公开",
            dataIndex: "publicFlag",
            key: "publicFlag",
            render: (text, record) => <Switch checked={text} onChange={checked => publicChange(record.id, checked)}/>
        },
        {
            title: "是否置顶",
            dataIndex: "topFlag",
            key: "topFlag",
            render: (text, record) => <Switch checked={text} onChange={checked => topChange(record.id, checked)}/>
        },
        {
            title: "操作",
            dataIndex: "actions",
            key: "actions",
            fixed: "right", // 将该列固定在表格的右侧
            render: (text, record) => (
                // 自定义操作列的渲染函数
                <Space>
                    <a onClick={() => navigate(`/blogs/edit/${record.id}`)}>
                        编辑
                    </a>
                    <a onClick={() => remove(record.id)} style={{color: 'red'}}>
                        删除
                    </a>
                    <a onClick={() => navigate(`/${record.id}/comments`)}>
                        评论管理
                    </a>
                    {/* 其他按钮或数据 */}
                </Space>
            ),
        },
    ] as ColumnsType<any>;

    const navigate = useNavigate();
    const {tagMap, categoryMap} = useSelfCacheContext();
    const [queryForm] = Form.useForm<BlogQuery>();
    const [pageInfo, setPageInfo] = useState<PageInfo>(DEFAULT_PAGE_INFO);
    const [list, setList] = useState<BlogInfo[]>([]);

    /**
     * 查询
     * @param queryParam
     */
    const query = (queryParam: BlogQuery) => {
        let uri = `/admin/blogs/page?timestamp=${Date.now()}`;
        for (let key in queryParam) {
            if (queryParam[key]) {
                uri += `&${key}=${queryParam[key]}`;
            }
        }
        viciRequest.get(uri).then((res: any) => {
            let response = res as PageRes<BlogInfo>;
            setList(response.list);
            setPageInfo(response.page);
        });
    }

    /**
     * 删除
     * @param id
     */
    const remove = (id: number) => {
        viciRequest.get(`/admin/blogs/delete/${id}`).then(res => {
            message.info("删除成功!");
            query({...queryForm.getFieldsValue()} as BlogQuery);
        })
    }

    const paginationChange = (pageNo: number, pageSize: number) => {
        let queryParam = queryForm.getFieldsValue();
        queryParam.pageNo = pageNo;
        queryParam.pageSize = pageSize;
        query(queryParam);
    }

    const publicChange = (id: number, status: boolean) => {
        viciRequest.get(`/admin/blogs/public/${id}/${status}`).then(res => {
            message.info(`${status ? '公开' : '隐藏'}成功!`);
            const newList = [...list];
            newList.find(it => it.id === id).publicFlag = status;
            setList(newList);
        });
    }

    const topChange = (id: number, status: boolean) => {
        viciRequest.get(`/admin/blogs/top/${id}/${status}`).then(res => {
            message.info(`${status ? '置顶' : '取消置顶'}成功!`);
            const newList = [...list];
            newList.find(it => it.id === id).topFlag = status;
            setList(newList);
        });
    }

    useEffect(() => {
        query({} as BlogQuery);
    }, [])

    return (
        <div style={{height: '100%', overflow: "auto"}}>
            <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel header="筛选" key="1">
                    <Form layout="inline" onFinish={query} form={queryForm}>
                        <Form.Item name={"categoryId"} label="类型:">
                            <Select style={{width: 120}}>
                                <Select.Option key={null} value={null}>无</Select.Option>
                                {[...categoryMap.values()].map(category => {
                                    return <Select.Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={"tagIdList"} label="标签:">
                            <Select
                                style={{width: 480}}
                                mode={"multiple"}
                            >
                                {[...tagMap.values()].map(tag => {
                                    return <Select.Option key={tag.id} value={tag.id}>
                                        <Tag color={tag.color}>{tag.name}</Tag>
                                    </Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={"title"} label="标题:">
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" icon={<SearchOutlined/>} htmlType={"submit"}/>
                        </Form.Item>
                    </Form>
                </Collapse.Panel>
            </Collapse>
            <br/>
            <Table
                rowKey={record => record.id}
                dataSource={list}
                columns={columns}
                pagination={{
                    total: pageInfo.total,
                    showTotal: (total) => `共${total}条`,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    onChange: paginationChange,
                    current: pageInfo.pageNo,
                    pageSize: pageInfo.pageSize
                }}
            />
        </div>
    )
}

export default BlogList;