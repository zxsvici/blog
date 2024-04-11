import {Link} from "react-router-dom";
import {Collapse} from "antd";
import {useEffect, useState} from "react";
import {DARK_ORANGE, GRAY} from "@/constans/color";
import {BlogViewTocItem} from "@/model/blog";
import {useCacheContext} from "@/components/context";

/**
 * 标题
 * @constructor
 */
const BlogViewToc = () => {

    const {tocItems} = useCacheContext();
    const [activeItems, setActiveItems] = useState<string[]>([]);

    //跳转至屏幕下 1/3 处
    const scrollToMiddle = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const windowHeight = window.innerHeight;
            const targetRect = targetElement.getBoundingClientRect();
            const targetTop = targetRect.top + window.scrollY;
            const scrollToY = targetTop - (windowHeight / 3); // 调整为屏幕上方 1/3 的位置
            window.scrollTo({top: scrollToY, behavior: 'smooth'});
        }
    }

    // 监听滚条显示当前阅读进度
    // 目录下内容越短 则 跳转函数显示偏差越大
    const handleScroll = () => {
        const newActiveItems = [];
        findActiveItem(tocItems, newActiveItems);
        setActiveItems(newActiveItems);
    }

    // 遍历目录项，判断当前滚动位置在哪个目录项的位置范围内
    const findActiveItem = (items, arr) => {
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            const targetElement = document.getElementById(item.anchor.slug);
            if (targetElement) {
                const targetRect = targetElement.getBoundingClientRect();
                if (scrollY >= targetRect.top + window.scrollY - window.innerHeight / 3) {
                    arr.push(item.anchor.slug);
                    if(item.children  && item.children.length > 0) {
                        findActiveItem(item.children, arr);
                    }
                    break;
                }
            }
        }
    }

    // 监听滚条事件添加
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [tocItems]);

    // 渲染目录
    const renderToc = (items: BlogViewTocItem[]) => {
        return (
            <ul style={{marginLeft: '5%'}}>
                {items.map((item, index) => (
                    <li style={{marginLeft: `${(item.level - 2) * 4}%`, marginTop: '2%'}}
                        key={item.anchor.title + '-' + index}>
                        <Link to={`${item.anchor.slug}`}
                              onClick={(e) => scrollToMiddle(e, item.anchor.slug)}
                            //@ts-ignore
                              onMouseEnter={(e) => e.target.style.color = DARK_ORANGE} // 在鼠标悬浮时改变字体颜色
                              onMouseLeave={(e) => {
                                  if(activeItems.indexOf(item.anchor.slug) === -1) {
                                      //@ts-ignore
                                      e.target.style.color = GRAY
                                  }
                              }} // 在鼠标离开时恢复字体颜色
                              style={{
                                  fontSize: 14,
                                  color: activeItems.includes(item.anchor.slug) ? DARK_ORANGE : GRAY,
                                  transition: 'color 0.3s ease',
                              }}
                        >
                            {item.anchor.title}
                        </Link>
                        {item.children && renderToc(item.children)}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div style={{
            position: "sticky",
            top: '10%',
            zIndex: 10
        }}>
            <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel header="目录导航" key="1">
                    {renderToc(tocItems)}
                </Collapse.Panel>
            </Collapse>
        </div>
    )
}

export default BlogViewToc;