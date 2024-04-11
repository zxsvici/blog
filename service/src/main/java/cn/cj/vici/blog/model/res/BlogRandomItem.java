package cn.cj.vici.blog.model.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogRandomItem {

    private Integer id;
    private LocalDateTime createTime;
    private String title;
    private String img;
}
