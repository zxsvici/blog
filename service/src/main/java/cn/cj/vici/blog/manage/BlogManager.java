package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Blog;
import cn.cj.vici.blog.model.vo.BlogQueryVO;
import cn.cj.vici.blog.model.vo.BlogVO;

import java.util.List;

public interface BlogManager {
    BlogVO save(BlogVO vo);

    List<BlogVO> list(BlogQueryVO query);

    BlogVO get(Integer id);

    PageView<BlogVO> page(BlogQueryVO query, Integer page, Integer size);

    BlogVO delete(Integer id);

    Boolean enable(Integer id, Boolean flag);

    Boolean top(Integer id, Boolean flag);

    Boolean comment(Integer id, Boolean flag);
}
