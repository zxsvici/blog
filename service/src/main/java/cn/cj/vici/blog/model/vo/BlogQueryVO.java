package cn.cj.vici.blog.model.vo;

import lombok.Data;

import java.util.List;

@Data
public class BlogQueryVO {

    private String title;

    private Integer categoryId;

    private List<Integer> tagIdList;
}
