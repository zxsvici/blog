import {Avatar, Collapse, Divider, Form, Image} from "antd";
import {useEffect, useState} from "react";
import baseRequest from "@/config/axios";
import {IntroductionRes} from "@/model/self-introduction";

const {Panel} = Collapse;

const Introduction = () => {

    const [data, setData] = useState<IntroductionRes>({
        accountList: [],
        avatar: "",
        hobbyList: [],
        name: "",
        signature: []
    });

    useEffect(() => {
        baseRequest.get('/introduction').then((res: any) => {
            const response = res as IntroductionRes;
            setData(response);
        }).catch(e => {

        }).finally(() => {

        })
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column', // 设置为垂直方向的列布局
            maxWidth: '15vw',
            marginLeft: '5vw',
            alignItems: 'center',
            justifyContent: 'center',  // 水平居中内容
            border: '0px solid gray',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            position: "sticky",
            top: '10%'
        }}>
            <Image src={data.avatar} width={'15vw'} height={'15vw'}/>
            <div style={{fontSize: 25, marginTop: 10}}>{data.name}</div>
            {data.signature && data.signature.length > 0 && <DynamicStringDisplay content={data.signature}/>}
            <Divider type={"vertical"}/>
            <div style={{marginTop: 5}}>
                {data.accountList.map((account, index) => {
                    return (
                        <a key={'account-' + index} href={account.link} style={{marginLeft: 10}}>
                        <Avatar src={account.img}
                                style={{ backgroundColor: "#ccc"}}
                                size='large'/>
                         </a>
                    )
                })}
            </div>
            {data.hobbyList.map((hobby, index) => {
                return (
                    <Collapse key={'hobby-' + index} defaultActiveKey={["1"]} style={{marginTop: 5, width: '80%'}}>
                        <Panel header={hobby.key} key="2">
                            {hobby.value}
                        </Panel>
                    </Collapse>
                )
            })};
        </div>
    )
};

/**
 * 字符串动态展示
 * @param content 字符串数组
 * @constructor
 */
const DynamicStringDisplay = ({content}: {content: string[]}) => {

    const [showIndex, setShowIndex] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const flag = current + 1 === content[showIndex].length;
        const timeoutId = setTimeout(() => {
            setCurrent(pre => (pre + 1) % content[showIndex].length);
            if (flag) {
                setShowIndex(pre => (pre + 1) % content.length)
            }
        }, flag ? 1500 : 200);

        return () => {
            clearTimeout(timeoutId)
        }
    }, [current, showIndex])

    return (
        <div className={'dynamic-text'}>
            <span>{content[showIndex].substring(0, current + 1)}</span>
            {content[showIndex].length >= current + 2 && <RandomTextAnimation/>}
        </div>
    )
};

const characters = '$%^&#!()_+-=|\\\"\'><?/,.[]{}*';

/**
 * 随机文字动画
 * @constructor
 */
const RandomTextAnimation = () => {
    const [randomText, setRandomText] = useState('');
    const [randomColor, setRandomColor] = useState('');

    useEffect(() => {

        const animationInterval = setInterval(() => {
            const newText = Array.from({ length: 3 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
            setRandomText(newText);

            const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            setRandomColor(randomColor);
        }, 150);

        return () => clearInterval(animationInterval);
    }, []);

    return (
        <span style={{ color: randomColor}}>
      {randomText}
    </span>
    );
};

export default Introduction;