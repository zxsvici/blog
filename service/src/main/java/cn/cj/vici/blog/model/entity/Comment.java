package cn.cj.vici.blog.model.entity;

import cn.cj.vici.blog.enums.AccountEnum;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @TableId(type = IdType.AUTO)
    /*标识*/
    private Integer id;
    /*业务标识*/
    private Integer blogId;
    /*根评论标识*/
    private Integer rootId;
    /*父评论标识*/
    private Integer parentId;
    /*内容*/
    private String content;
    /*昵称*/
    private String nickname;
    /*头像*/
    private String avatar;
    /*邮箱*/
    private String email;
    /*是否订阅回复*/
    private Boolean remindFlag;
    /*创建日期*/
    private LocalDateTime createTime;
    /*是否删除*/
    private Boolean deleteFlag;
    private String website;
}
