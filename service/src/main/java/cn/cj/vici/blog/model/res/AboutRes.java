package cn.cj.vici.blog.model.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AboutRes {

    private String content;

    private Boolean commentEnable;

}
