package cn.cj.vici.blog.model.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentReq {

    private Integer blogId;

    private Integer parentId;

    private String content;

    private String nickname;

    private String avatar;

    private String email;

    private Boolean remindFlag;

    private String website;

}
