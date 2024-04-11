import {Button, Input, message, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {CategoryInfo} from "@/model/category";
import {PageInfo} from "@/model";
import {DEFAULT_PAGE_INFO} from "@/constants/default";
import viciRequest from "@/config/axios";
import {ColumnsType} from "antd/lib/table";

const CategoryList = () => {

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
            width: '30%',
            render: (text, record) => idNameMap.has(record.id) ?
                <div style={{display: "flex"}}>
                    <Input defaultValue={idNameMap.get(record.id)}
                            onChange={(e) => edit(record.id, e.target.value)}/>
                    <Button type="primary" onClick={() => editCancel(record.id)} style={{background: "GrayText"}}>
                        取消
                    </Button>
                </div>
                :
                text
        },
        {
            title: "操作",
            dataIndex: "actions",
            key: "actions",
            fixed: "right",
            render: (text, record) => (
                // 自定义操作列的渲染函数
                <Space>
                    {idNameMap.has(record.id) ?
                        <a onClick={() => save(record.id)}>
                            保存
                        </a>
                        :
                        <a onClick={() => edit(record.id, record.name)}>
                            编辑
                        </a>
                    }
                    <a onClick={() => remove(record.id)} style={{color: 'red'}}>
                        删除
                    </a>
                    {/* 其他按钮或数据 */}
                </Space>
            ),
        },
    ] as ColumnsType<any>;

    const [list, setList] = useState<CategoryInfo[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>({...DEFAULT_PAGE_INFO});
    const [idNameMap, setIdNameMap] = useState<Map<number, string>>(new Map<number, string>());

    useEffect(() => {
        query(pageInfo.pageNo, pageInfo.pageSize);
    }, []);

    const query = (pageNo: number, pageSize: number) => {
        viciRequest.get(`/admin/categories/page/list?page=${pageNo}&size=${pageSize}`).then((res: any) => {
            setList(res.list);
            setPageInfo(res.page)
        })
    }

    const edit = (id: number, name: string) => {
        setIdNameMap((prevMap) => {
            const newMap = new Map<number, string>(prevMap);
            newMap.set(id, name);
            return newMap;
        });
    }

    const editCancel = (id: number) => {
        setIdNameMap((prevMap) => {
            const newMap = new Map<number, string>(prevMap);
            newMap.delete(id);
            return newMap;
        });
        // 如果是新增取消则还需要删除增加的item
        if(id < 0) {
            const newList: CategoryInfo[] = [];
            list.filter(item => item.id !== id).forEach(item => newList.push(item));
            setList(newList);
        }
    }

    const save = (id: number) => {
        const name = idNameMap.get(id);
        const req = {id: id, name: name};
        if(id < 0) {
            viciRequest.post('/admin/categories',req).then((res: any) => {
                success(id);
                const newList: CategoryInfo[] = [];
                list.forEach(item => {
                    if(item.id === id && name) {
                        item.name = name;
                        item.id = res.id;
                    }
                    newList.push(item);
                })
                setList(newList);
            });
        }else {
            viciRequest.put(`/admin/categories/${id}`, req).then(res => {
                success(id);
                const newList: CategoryInfo[] = [];
                list.forEach(item => {
                    if(item.id === id && name) {
                        item.name = name;
                    }
                    newList.push(item);
                })
                setList(newList);
            });
        }
    }

    const success = (id: number) => {
        message.info("保存成功");
        setIdNameMap((prevMap) => {
            const newMap = new Map<number, string>(prevMap);
            newMap.delete(id);
            return newMap;
        });
    }

    const remove = (id: number) => {
        viciRequest.delete(`/admin/categories/${id}`).then(res => {
            message.info('删除成功!')
            query(pageInfo.pageNo, pageInfo.pageSize);
        })
    }

    const create = () => {
        const id = list.length === 0 || list[0].id > 0 ? -1 : list[0].id - 1;
        const newList: CategoryInfo[] = [{id: id, name: ''}, ...list];
        setList(newList);
        edit(id, '');
    }

    return (
        <div>
            <Button type="primary" onClick={create}>添加分类</Button>
            <Table
                rowKey={(record => record.id)}
                virtual={true}
                dataSource={list}
                columns={columns}
                pagination={{
                    total: pageInfo?.total,
                    showTotal: (total) => `共${total}条`,
                    // pageSizeOptions: ["10", "20", "40"],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    onChange: query
                }}
            />
        </div>
    )
}

export default CategoryList;