import {Avatar, Button, Card, Tag, Timeline} from "antd";
import {useEffect, useState} from "react";
import baseRequest from "@/config/axios";
import {BlogItemInfo, QueryType} from "@/model/blog";
import {parseISO, format} from 'date-fns';
import * as React from "react";
import {ZERO_WIDTH_SPACE} from "@/constans/character";
import {Link} from "react-router-dom";
import {CYAN, DARK_PURPLE, LAWN_GREEN, ORANGE, SUNFLOWER_YELLOW} from "@/constans/color";
import {mouseEnter, mouseLeave} from "@/utils/event";

interface TimeLineItem {
    label?: string,
    children: React.ReactNode,
    dot?: React.ReactNode
}

const colors = [CYAN, LAWN_GREEN, SUNFLOWER_YELLOW, ORANGE, DARK_PURPLE];

const Archives = () => {

    const [list, setList] = useState<(TimeLineItem)[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        baseRequest.get('/archives').then((res: any) => {
            const data = res as (BlogItemInfo)[];
            const items = dataToList(data);
            setList(items);
            setCount(data.length);
        }).catch(e => {
            setList(dataToList([]));
        }).finally(() => {
        })
    }, []);

    const dataToList = (data: (BlogItemInfo)[]) => {
        const items: TimeLineItem[] = [];
        const set = new Set<string>;
        let colorIndex = 0;
        data.forEach(item => {
                const time = parseISO(item.createTime);
                const year = time.getFullYear();
                const month = time.getMonth() + 1;
                const day = time.getDate();
                const yearMonth = year + '年' + month + '月';
                if (!set.has(yearMonth)) {
                    colorIndex = (colorIndex + 1) % colors.length;
                    set.add(yearMonth);
                    items.push({
                        dot: <Button key={yearMonth + 's'} style={{background: colors[colorIndex], fontWeight: 700}}>{yearMonth}</Button>,
                        children: <div>{ZERO_WIDTH_SPACE}<br/></div>
                    });
                }
                items.push({
                    children: <Link to={`/blogs/${item.id}`}>
                        <Button
                            type={"primary"}
                            style={{background: colors[colorIndex], color: "black"}}
                            onMouseLeave={mouseLeave}
                            onMouseEnter={mouseEnter}
                        >
                            {item.title}
                        </Button>
                    </Link>,
                    label: day + '日'
                });
            }
        )
        items.push({
            dot: <Button key={'HelloWorld'} style={{background: colors[(colorIndex + 1) % colors.length], fontWeight: 700}}>一切从这里开始</Button>,
            children: <div style={{minHeight: '3em'}}>{ZERO_WIDTH_SPACE}</div>
        });
        return items;
    }

    return (
        <div>
            <div className="ui top attached segment" style={{textAlign: 'center'}}>
                <h2 className="m-text-500">文章归档</h2>
                <p>好! 目前共计 {count} 篇日志。 继续努力。</p>
            </div>
            <div className="ui attached segment">
                <Timeline
                    mode={"left"}
                    items={list}
                    style={{marginLeft: '-80%'}}
                />
            </div>
        </div>
    )
}

export default Archives;