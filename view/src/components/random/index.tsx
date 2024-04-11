import {Collapse, Image, Tag} from "antd";
import {Link} from "react-router-dom";
import {mouseEnter, mouseLeave} from "@/utils/event";
import {useEffect, useState} from "react";
import baseRequest from "@/config/axios";

const RandomBlog = () => {

    const blogs = [
        {
            id: 1,
            title: '1',
            createTime: '2017-01-02',
            img: '/img/bg3.jpg'
        },
        {
            id: 2,
            title: '2',
            createTime: '2017-01-02',
            img: '/img/bg1.jpg'
        },
        {
            id: 3,
            title: '3',
            createTime: '2017-01-02',
            img: '/img/mail.png'
        },
        {
            id: 4,
            title: '4',
            createTime: '2017-01-02',
            img: '/img/bg1.jpg'
        },
    ]
    const [data, setData] = useState([]);

    useEffect(() => {
        baseRequest.get('/blogs/list/random').then((res: any) => {
            const response = res as {id: number, title: string, createTime: string, img: string}[];
            const origin = window.location.origin;
            if(origin.startsWith("http://127.0.0.1")) {

            } else {

            }
            setData(response);
        }).catch(e => {

        }).finally(() => {

        });
    }, [])

    const onClick = () => {

    }

    return (
        <div style={{zIndex: 10}}>
            <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel header="随机推荐" key="1">
                    {data.map(blog => {
                        return <Link
                            key={blog.id}
                            to={`/blogs/${blog.id}`}>
                            <div key={blog.id}
                                 style={{
                                     width: '100%',
                                     height: '80px',
                                     backgroundImage: `url("${blog.img}")`,
                                     backgroundSize: "cover",
                                     marginTop: 10,
                                     display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                                     boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)',
                                     fontSize: 12,
                                     color: "white"
                                 }}
                                 onMouseEnter={mouseEnter}
                                 onMouseLeave={mouseLeave}>
                                {blog.createTime}
                                <br/>
                                {blog.title}
                            </div>
                        </Link>
                    })}
                </Collapse.Panel>
            </Collapse>
        </div>
    )
}

export default RandomBlog;