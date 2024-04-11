package cn.cj.vici.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("blog_tag_relation")
public class BlogTag {

    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer blogId;
    private Integer tagId;
}
