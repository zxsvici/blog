package cn.cj.vici.blog.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {

    private Integer id;

    private String name;

    private String nameEn;

    private String website;

    private String gitUrl;

    private String description;
}
