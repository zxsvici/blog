package cn.cj.vici.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Blog {

    @TableId(type = IdType.AUTO)
    private Integer id;
    private String title;
    private String headerImage;
    private String content;
    private String description;
    private Boolean publicFlag;
    private Boolean commentFlag;
    private Boolean topFlag;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Integer visits;
    private Integer words;
    private Long readTime;
    private String pwd;
    private Integer categoryId;
    private String tagIdList;
    private Boolean deleteFlag;
}
