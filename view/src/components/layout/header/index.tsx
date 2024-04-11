import {MINT_GREEN} from "@/constans/color";
import SelfMenu from "@/components/layout/menu";
import {Input} from "antd";
import {Header} from "antd/es/layout/layout";
import {QueryType} from "@/model/blog";
import {useNavigate} from "react-router-dom";

const SelfHeader = ({menuBackground, siteName, isMobile}: {menuBackground: string, siteName: string, isMobile: boolean}) => {

    const navigate = useNavigate();

    /**
     * 模糊查询Blog
     * @param value
     */
    const search = (value: string) => {
        navigate(`/home#type=${QueryType.LIKE}&key=${value}`);
    }

    return (
        <Header style={{
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            background: menuBackground,
            zIndex: 1000,
            position: "fixed",
            justifyContent: "center",
            flexWrap: "wrap",
            wordWrap: "break-word"
        }}>
            {isMobile ?
                <div style={{flex: 1}}>
                    <SelfMenu isMobile={isMobile}/>
                </div>
                :
                <>
                    <div style={{fontSize: 16, color: MINT_GREEN, fontWeight: 700, zIndex: 2}}>
                        {siteName}
                    </div>
                    <SelfMenu isMobile={isMobile}/>
                </>
            }
            <Input.Search placeholder="搜索" style={{width: '200px', justifyContent: "flex-end"}}
                          onSearch={(value) => search(value)}/>
        </Header>
    )
};

export default SelfHeader;