import {Site} from "@/model/site";
import {DownOutlined} from "@ant-design/icons";
import {MouseEvent as ReactMouseEvent, useState} from "react";

const HeaderImg = ({site} : {site: Site}) => {

    // 鼠标横坐标
    const [x, setX] = useState<number>(0);
    // 图片透明度
    const [op, setOp] = useState<number>(0);

    /**
     * 跳转至正文处
     */
    const scrollToContent = () => {
        window.scrollTo({top: window.innerHeight - 64, behavior: 'smooth'});
    }

    /**
     * 首页图片的鼠标监控事件
     * 1、鼠标进入时记录开始坐标
     * 2、实时计算鼠标位置的水平位移量，调控背景图的模糊程度
     * 3、鼠标脱离时恢复默认显示
     * @param event
     */
    const mouseEnterImg = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        setX(event.clientX);
    }
    const mouseMoveImg = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        if (x !== null) {
            let distance = event.clientX - x;
            //保证在2/3的区域内左右都可以看到下一层
            let width = window.innerWidth / 3;
            let op = distance / width;
            //最大为1否则会出现白屏
            if (Math.abs(op) <= 1) {
                setOp(op);
            }
        }
    }
    const mouseLeaveImg = () => {
        setX(0);
        setOp(0);
    }

    return (
        <div
            className={'blog-img'}
            onMouseEnter={mouseEnterImg}
            onMouseMove={mouseMoveImg}
            onMouseLeave={mouseLeaveImg}
        >
            <div className={'blog-img-back'}
                 style={{backgroundImage: `url("${site.siteImg}")`, opacity: 1 - Math.abs(op)}}/>
            <div className={'blog-img-back'}
                 style={{backgroundImage: `url("${site.siteImgLeft}")`, opacity: op}}/>
            <div className={'blog-img-back'}
                 style={{backgroundImage: `url("${site.siteImgRight}")`, opacity: -op}}/>
            <div className={'blog-title'}>
                策君丶BLOG
            </div>
            <DownOutlined className={'down-icon'} onClick={scrollToContent}/>
        </div>
    )
}

export default HeaderImg;