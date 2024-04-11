package cn.cj.vici.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Friend {

    @TableId(type = IdType.AUTO)
    private Integer id;
    private String name;
    private String signature;
    private String avatar;
    private String website;
    private Boolean deleteFlag;
}
