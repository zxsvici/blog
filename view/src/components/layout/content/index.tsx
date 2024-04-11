import Introduction from "@/components/introduction";
import {Suspense, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import RandomBlog from "@/components/random";
import TagLibrary from "@/components/tag";
import BlogViewToc from "@/components/blog/toc";
import {Content} from "antd/es/layout/layout";

const SelfContent = ({showImg, showToc, isMobile} : {isMobile: boolean, showImg: boolean, showToc: boolean}) => {

    const [viewStyle, setViewStyle] = useState({});

    useEffect(() => {
        if(isMobile) {
            setViewStyle({width: '94vw', minHeight: '30vh', marginLeft: '3vw', marginRight: '3vw'});
        }else {
            setViewStyle({width: '50vw', minHeight: '30vh', marginLeft: '3vw'});
        }
    }, [isMobile])

    return (
        <Content style={{marginLeft: '1vw', marginTop: isMobile ? '64px' : showImg ? '1%' : '5%', zIndex: showImg ? 999 : 1}}>
            <div style={{display: 'flex', position: "relative"}}>
                {!isMobile && <div>
                    <Introduction/>
                </div>}
                <div style={viewStyle}>
                    <Suspense fallback={<div>Loading...</div>}><Outlet/></Suspense>
                </div>
                {!isMobile && <div style={{marginLeft: '3vw', width: '15vw', zIndex: 1, top: '10%', position: "sticky"}}>
                    <RandomBlog/>
                    <TagLibrary/>
                    {showToc && <BlogViewToc/>}
                </div>}
            </div>
        </Content>
    )
}

export default SelfContent;