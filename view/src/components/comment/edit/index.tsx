import {Avatar, Button, Divider, Form, Input, message, Tooltip} from "antd";
import {useEffect, useState} from "react";
import {CommentView, CommentVo, VisitorInfo} from "@/model/comment";
import Visitor from "@/components/visitor";
import {BLUE, SKY_BLUE} from "@/constans/color";
import baseRequest from "@/config/axios";

const CommentEdit = ({parent, blogId, reload}: { parent?: CommentView, blogId: number, reload: Function}) => {

    const [visitor, setVisitor] = useState<VisitorInfo>({avatar: "", email: "", nickname: "", website: "", initFlag: false});
    const [toLogin, setToLogin] = useState<boolean>(false);
    const [editForm] = Form.useForm();

    useEffect(() => {
        const localVisitor = JSON.parse(localStorage.getItem('vici_visitor')) as VisitorInfo;
        if (localVisitor) {
            if(localVisitor.avatar.startsWith("/static")) {
                localVisitor.avatar = "/api" + localVisitor.avatar;
            }
            setVisitor(localVisitor);
        }
    }, []);

    useEffect(() => {
        editForm.resetFields();
    }, [parent, blogId]);

    const clearCache = () => {
        localStorage.removeItem('vici_visitor');
    }

    const publish = () => {
        // console.log(`content is ${JSON.stringify(editForm.getFieldsValue())}`);
        const content = editForm.getFieldValue('content');
        if(!content || content === '') {
            message.error('你还没有评论！');
            return;
        }
        const comment: CommentVo = {
            blogId: blogId,
            content: content,
            avatar: visitor.avatar,
            email: visitor.email,
            nickname: visitor.nickname,
            parentId: parent ? parent.id : -1,
            website: visitor.website
        }
        baseRequest.post(`/comments`, comment).then((res: any) => {
            editForm.resetFields();
            reload();
        }).catch(e => {
            message.error('评论失败');
        }).finally(() => {

        })
    }

    return (
        <div>
            {/*<Button type={"primary"} htmlType={"button"} onClick={clearCache}>清除缓存</Button>*/}
            {visitor.initFlag ?
                <Form form={editForm}>
                    <Form.Item name={'content'} label={<Avatar src={visitor.avatar} size={50} style={{marginTop: '1em'}}/>}>
                        <div>
                            <Input.TextArea placeholder={parent && `回复 ${parent.nickname}`} style={{width: '80%'}}/>
                            <Divider type={'vertical'}/>
                            <Button type={"primary"} htmlType={"submit"}
                                    style={{height: '100%', background: SKY_BLUE, marginBottom: '1em'}}
                                    onMouseEnter={event => event.currentTarget.style.background = BLUE}
                                    onMouseLeave={event => event.currentTarget.style.background = SKY_BLUE}
                                    onClick={() => {
                                        publish();
                                        // reply(-1);
                                    }}
                            >
                                发布
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
                :
                <div>
                    <Tooltip title={"用于评论，云端不会记录信息，仅存于本地"}>
                        <Button type="primary" onClick={() => setToLogin(true)}>
                            访客登录
                        </Button>
                    </Tooltip>
                    <Visitor visible={toLogin} setVisitor={setVisitor} onCancel={() => setToLogin(false)}/>
                </div>
            }
        </div>
    )
};

export default CommentEdit;