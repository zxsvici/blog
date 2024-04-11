package cn.cj.vici.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Visitor {

    @TableId(type = IdType.AUTO)
    private Integer id;
    
    private String avatar;

    private String nickname;

    private String website;

    private String mail;

}
