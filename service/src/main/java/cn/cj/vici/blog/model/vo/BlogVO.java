package cn.cj.vici.blog.model.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BlogVO {
    /**
     * 编号
     */
    private Integer id;
    /**
     * 标题
     */
    private String title;
    /**
     * 导图
     */
    private String headerImage;
    /**
     * 正文
     */
    private String content;
    /**
     * 描述
     */
    private String description;
    /**
     * 是否公开
     */
    private Boolean publicFlag;
    /**
     * 是否可评论
     */
    private Boolean commentFlag;
    /**
     * 是否置顶
     */
    private Boolean topFlag;
    /**
     * 分类标识
     */
    private Integer categoryId;
    /**
     * 标签标识列表
     */
    private List<Integer> tagIdList;

    private LocalDateTime createTime;

    private LocalDateTime modifyTIme;
}
