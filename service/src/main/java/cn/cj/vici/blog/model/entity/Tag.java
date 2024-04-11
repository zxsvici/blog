package cn.cj.vici.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Tag {

    /**
     * 标识
     */
    @TableId(type = IdType.AUTO)
    private Integer id;
    /**
     * 名称
     */
    private String name;
    /**
     * 颜色
     */
    private String color;
    /**
     * 逻辑删除标记
     */
    private Boolean deleteFlag;
    /**
     * 启用
     */
    private Boolean enable;
}
