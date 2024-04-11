import {Avatar, Divider, Layout} from "antd";
import {Link} from "react-router-dom";
import "./style.scss"

const {Footer} = Layout;

const SelfFooter = ({beiAn}: {beiAn: string}) => {

    return (
        <Footer className={'ui inverted vertical segment m-padded-tb-large m-opacity'}
                style={{textAlign: 'center', marginTop: '5em', width: '100vw', marginBottom: 0}}>
            <div>
                Copyright ©2023 VICI-策君丶BLOG
            </div>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: '1em'}}>
                <Link to={'https://spring.io/projects/spring-boot'} className={'link'}>
                    <Avatar src={'/img/bxl-spring-boot.png'} size={"small"}/>
                    Spring Boot
                </Link>
                <Divider type={'vertical'}/>
                <Link to={'https://react.dev/'} className={'link'}>
                    <Avatar src={'/img/react.png'} size={"small"}/>
                    <span>React</span>
                </Link>
                <Divider type={'vertical'}/>
                <Link to={'https://ant.design/'} className={'link'}>
                    <Avatar src={'/img/antd.png'} size={"small"}/>
                    <span>Ant Design</span>
                </Link>
            </div>
            <div style={{marginTop: '0.5em'}}>
                <Link to={'http://beian.miit.gov.cn/'} className={'link'}>
                    <Avatar src={'/img/beian.png'} size={"small"}/>
                    {/*皖ICP备2021010576号-2*/}
                    {beiAn}
                </Link>
            </div>
        </Footer>
    )
}

export default SelfFooter;