import {Layout} from 'antd';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom"
import SelfContent from "@/components/layout/content";
import SelfFooter from "@/components/layout/footer";
import {ArrowUpOutlined} from "@ant-design/icons";
import {Site} from "@/model/site";
import baseRequest from "@/config/axios";
import HeaderImg from "@/components/layout/header-img";
import SelfHeader from "@/components/layout/header";

const homeUri = "/home";

const Home = () => {

    const location = useLocation();

    // 菜单背景颜色
    const [menuBackground, setMenuBackground] = useState('transparent');
    // 是否显示图片
    const [showImg, setShowImg] = useState<boolean>(true);
    // 是否显示目录
    const [showToc, setShowToc] = useState<boolean>(false);
    // 是否显示返回顶部按钮
    const [showUp, setShowUp] = useState<boolean>(false);
    // 网站信息
    const [site, setSite] = useState<Site>({
        beiAn: "sb",
        siteImg: "/img/kdl2.jpg",
        siteImgLeft: "/img/kdl4.jpg",
        siteImgRight: "/img/kdl.jpg",
        siteName: '策君丶Blog'
    });
    const [isMobile, setIsMobile] = useState<boolean>(false);

    /**
     * 监听滚条更改头部样式
     */
    const handleScrollMenu = () => {
        const scrollY = window.scrollY;
        if (scrollY > window.innerHeight * 2 / 3) {
            setMenuBackground('rgba(0, 0, 0, 0.8)');
        } else {
            setMenuBackground('transparent');
        }
    };

    const handleWindowResize = () => {
        if(window.innerWidth <= 768) {
            setIsMobile(true);
            setMenuBackground('rgba(0, 0, 0, 0.8)');
        }else {
            setIsMobile(false);
        }
    };

    /**
     * 监听滚条去加载回到顶部的按钮
     */
    const handleScrollUp = () => {
        const scrollY = window.scrollY;
        if (scrollY > window.innerHeight / 3) {
            setShowUp(true);
        } else {
            setShowUp(false);
        }
    };

    /**
     * 跳转至正文处
     */
    const scrollToContent = () => {
        window.scrollTo({top: window.innerHeight - 64, behavior: 'smooth'});
    }

    /**
     * 跳转至最上端
     */
    const scrollToUp = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    /**
     * 初次加载获取网站基本配置
     */
    useEffect(() => {
        baseRequest.get('/sites').then((res: any) => {
            let response = res as Site;
            setSite(response);
        });
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    /**
     * 1、仅在Home显示首页图
     * 2、在Blog展示页面需要显示Blog目录
     */
    useEffect(() => {

        if(!isMobile) {
            window.addEventListener('scroll', handleScrollUp);
            if (location.pathname === homeUri && location.search === '' && location.hash === '') {
                setShowImg(true);
                setShowToc(false);
                setMenuBackground('transparent');
            } else {
                if (showImg) {
                    setShowImg(false);
                    setMenuBackground('rgba(0, 0, 0, 0.8)');
                }
                if (location.pathname.indexOf('blogs') !== -1 || location.pathname.indexOf('projects') !== -1) {
                    setShowToc(true);
                } else {
                    setShowToc(false);
                }
            }
        }
    }, [location]);

    /**
     * 显示首页图片时需要添加进度条监控事件
     */
    useEffect(() => {
        if(isMobile) {
            setMenuBackground('rgba(0, 0, 0, 0.8)');
        }
        if (showImg && !isMobile) {
            window.addEventListener('scroll', handleScrollMenu);
        } else {
            setMenuBackground('rgba(0, 0, 0, 0.8)');
        }
        return () => {
            if(!isMobile) {
                window.removeEventListener('scroll', handleScrollMenu);
            }
        }
    }, [showImg, isMobile]);

    return (
        <Layout className="layout">
            <SelfHeader menuBackground={menuBackground} siteName={site.siteName} isMobile={isMobile}/>
            {!isMobile && showImg && <HeaderImg site={site}/>}
            <SelfContent showImg={showImg} showToc={showToc} isMobile={isMobile}/>
            {showUp && <ArrowUpOutlined className={'up-icon'} onClick={scrollToUp}/>}
            <SelfFooter beiAn={site.beiAn}/>
        </Layout>
    );
}

export default Home;