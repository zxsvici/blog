package cn.cj.vici.blog.model.res;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommentListItem {

    /*标识*/
    private Integer id;
    /*根评论标识*/
    private Integer rootId;
    /*内容*/
    private String content;
    /*昵称*/
    private String nickname;
    /*父评论昵称*/
    private String parentNickname;
    /*头像*/
    private String avatar;
    /*邮箱*/
    private String mail;
    /*是否订阅回复*/
    private Boolean remindFlag;
    private Boolean deleteFlag;
    /*创建日期*/
    private LocalDateTime createTime;
    /*子评论*/
    private List<CommentListItem> children;
    private String website;
}
