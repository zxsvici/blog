import {Button, Drawer, Menu} from "antd";
import {
    FileOutlined,
    HomeFilled, HomeOutlined, InfoOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
    MessageFilled, MessageOutlined, QuestionOutlined,
    SwitcherFilled, SwitcherOutlined,
    UserDeleteOutlined, UsergroupAddOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Category, QueryType} from "@/model/blog";
import {DARK_GREEN, MINT_GREEN} from "@/constans/color";
import {useCacheContext} from "@/components/context";
import MenuItem from "antd/es/menu/MenuItem";
import SubMenu from "antd/es/menu/SubMenu";

const fixedItems = [
    {
        key: '/home',
        label: '首页',
        icon: <HomeOutlined/>,
    },
    {
        key: '/category',
        label: '分类',
        icon: <FileOutlined/>,
        children: []
    },
    {
        key: '/archives',
        label: '归档',
        icon: <SwitcherOutlined/>,
    },
    {
        key: '/moments',
        label: '动态',
        icon: <MessageOutlined/>,
    },
    {
        key: '/friends',
        label: '友人帐',
        icon: <UsergroupAddOutlined/>,
    },
    // {
    //     key: '/projects',
    //     label: '开源项目',
    //     icon: <QuestionOutlined/>,
    //     children: []
    // },
    {
        key: '/about',
        label: '关于我',
        icon: <InfoOutlined/>
    },
]

const SelfMenu = ({isMobile}) => {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [current, setCurrent] = useState<string>('');
    const {categories, projectList} = useCacheContext();
    const location = useLocation();
    const [visible, setVisible] = useState(false);


    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {

        const arrCategory = [];
        // const arrProject = [];
        try {
            categories.forEach(category => {
                arrCategory.push({
                    key: `/home#type=${QueryType.CATEGORY}&key=${category.id}`,
                    label: category.name
                })
            });
            // projectList.forEach(project => {
            //     arrProject.push({
            //         key: `/projects/${project.id}`,
            //         label: project.name
            //     });
            // });
        }catch (e) {

        }finally {
            fixedItems[1].children = arrCategory;
            // fixedItems[5].children = arrProject;
            const wrapperItems = fixedItems.map(item => {
                return {
                    key: item.key,
                    label: <div id={item.key} style={{color: item.key === current ? MINT_GREEN : ''}} onMouseEnter={select} onMouseLeave={unselect}>
                        {item.icon}
                        <label style={{marginLeft: '15%'}}>{item.label}</label>
                    </div>,
                    children: item.children
                }
            });
            setItems(wrapperItems);
        }

    }, [categories, current]);

    useEffect(() => {
        setCurrent(location.pathname);
    }, [location]);

    const onClick = (event) => {
        setCurrent(event.key);
        navigate(event.key);
    }

    const select = (event) => {
        event.currentTarget.style.color = MINT_GREEN;
    }

    const unselect = (event) => {
        if(event.currentTarget.id !== current) {
            event.currentTarget.style.color = '';
        }
    }

    return (

        <>
            {
                !isMobile ?
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={items}
                        onClick={onClick}
                        style={{
                            background: 'transparent',
                            fontSize: 14,
                            zIndex: 3
                        }}
                        selectable={false}
                    >
                        {/*<SubMenu children={items}/>*/}
                    </Menu>
                    :
                    <>
                        <Button icon={visible ? <MenuFoldOutlined/> : <MenuUnfoldOutlined/>} onClick={() => setVisible(!visible)} style={{color: DARK_GREEN}}/>
                        <Drawer
                            title="菜单"
                            placement="left"
                            closable={false}
                            onClose={onClose}
                            open={visible}
                        >
                            <Menu
                                theme="light"
                                mode="vertical" // 设置为 vertical 模式
                                items={items}
                                onClick={(event) => {
                                    onClick(event);
                                    setVisible(false);
                                }}
                                style={{
                                    background: 'transparent',
                                    fontSize: 14,
                                    zIndex: 3
                                }}
                                selectable={false}
                            >
                                {/*<SubMenu children={items}/>*/}
                            </Menu>
                        </Drawer>
                    </>
            }
        </>
    )
};

export default SelfMenu;