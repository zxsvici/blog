package cn.cj.vici.blog.model.res;

import cn.cj.vici.blog.model.entity.Category;
import cn.cj.vici.blog.model.entity.Tag;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogListItem {

    private Integer id;
    private String title;
    private String headerImage;
    private String description;
    private Boolean topFlag;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Integer visits;
    private Integer words;
    private Category category;
    private List<Tag> tagList;

}
