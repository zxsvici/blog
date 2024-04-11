import {
    AppstoreOutlined, CloudOutlined,
    CommentOutlined,
    DesktopOutlined, EditOutlined,
    FileOutlined,
    FormOutlined,
    PieChartOutlined, ProjectOutlined, SkinOutlined, TagsOutlined,
    TeamOutlined, ToolOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Menu} from "antd";
import {useNavigate, useLocation} from "react-router-dom"
import {useEffect, useState} from "react";

const items = [
    {
        key: "/dashboard",
        label: "试图",
        icon: <PieChartOutlined/>
    },
    {
        key: "/work",
        label: "文章管理",
        icon: <AppstoreOutlined />,
        children: [
            {
                key: "/blogs/edit",
                label: "写文章",
                icon: <EditOutlined />
            },
            {
                key: "/moment/edit",
                label: "写动态",
                icon: <EditOutlined />
            },
            {
                key: "/blogs",
                label: "文章管理",
                icon: <FormOutlined />
            },
            {
                key: "/categories",
                label: "文章分类管理",
                icon: <SkinOutlined />
            },
            {
                key: "/tags",
                label: "文章标签管理",
                icon: <TagsOutlined />
            },
            {
                key: "/moments",
                label: "动态管理",
                icon: <ProjectOutlined />
            },
        ]
    },
    {
        key: "/config",
        label: "页面管理",
        icon: <ToolOutlined />,
        children: [
            {
                key: "/sites",
                label: "站点",
                icon: <CloudOutlined />
            },
            {
                key: "/friends",
                label: "友链",
                icon: <TeamOutlined/>
            },
            {
                key: "/about",
                label: "关于我",
                icon: <TeamOutlined/>
            },
        ],
    }
]

const SelfMenu = ({setLabelArr}: {setLabelArr: Function}) => {

    const [current, setCurrent] = useState<string>('/dashboard');
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [keyLabelMap, setKeyLabelMap] = useState<Map<string, string[]>>(new Map());
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const map = buildKeyLabelMap(items, [], new Map<string, string[]>());
        setKeyLabelMap(map);
    },[]);

    useEffect(() => {
        const pathname = location.pathname;
        //异步设置的keyLabelMap在函数执行中可能为空
        const map = buildKeyLabelMap(items, [], new Map<string, string[]>());
        setKeyLabelMap(map);
        if(map.has(pathname)) {
            setLabelArr(map.get(pathname));
        }else if (pathname.indexOf('/blogs/edit/') != -1) {
            const arr = [...map.get('/blogs/edit')];
            arr.push(pathname.replace('/blogs/edit/', ''));
            setLabelArr(arr);
        }else if (pathname.indexOf('/moment/edit/') != -1) {
            const arr = [...map.get('/moment/edit')];
            arr.push(pathname.replace('/moment/edit/', ''));
            setLabelArr(arr);
        }
    }, [location]);

    const buildKeyLabelMap = (list: any[], arr: string[], map: Map<string, string[]>) : Map<string, string[]> => {
        if(keyLabelMap.size > 0) {
            return new Map<string, string[]>(keyLabelMap);
        }
        list.forEach(item => {
            const labelArr = [...arr, item.label];
            map.set(item.key, labelArr);
            if(item.children) {
                buildKeyLabelMap(item.children, labelArr, map);
            }
        });
        return map;
    }

    const menuClick = (event) => {
        let key = event.key;
        setCurrent(key);
        navigate(key);
    }

    const onOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    }

    return (
        <Menu theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline" items={items}
              onClick={menuClick}
              onOpenChange={onOpenChange}
              openKeys={openKeys}
        />
    )
}

export default SelfMenu