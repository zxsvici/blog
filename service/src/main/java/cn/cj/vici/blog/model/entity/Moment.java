package cn.cj.vici.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Moment {

    @TableId(type = IdType.AUTO)
    private Integer id;

    private String content;

    private LocalDateTime createTime;

    private Integer likes;

    private Boolean publicFlag;

    private Boolean deleteFlag;
}
