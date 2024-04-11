package cn.cj.vici.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class BaseConfig {

    @TableId(type = IdType.AUTO)
    private Integer id;
    private String nameEn;
    private String nameCn;
    private String value;
    private String type;
    private Boolean basicFlag;
}
