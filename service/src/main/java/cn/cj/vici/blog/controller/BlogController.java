package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.manage.ApiBlogManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.res.BlogListItem;
import cn.cj.vici.blog.model.res.BlogRandomItem;
import cn.cj.vici.blog.model.res.BlogRes;
import cn.cj.vici.blog.model.vo.BlogVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/blogs")
public class BlogController {

    @Resource
    private ApiBlogManager manager;

    @GetMapping
    public PageView<BlogListItem> page(Integer page, Integer size, Integer type, String key) {
        page = Optional.ofNullable(page).orElse(1);
        size = Optional.ofNullable(size).orElse(5);
        type = Optional.ofNullable(type).orElse(0);
        return manager.index(page, size, type, key);
    }

    @GetMapping("/{id}")
    public BlogRes get(@PathVariable Integer id) {
        return manager.get(id);
    }

    @GetMapping("/list/random")
    public List<BlogRandomItem> random() {
        return manager.random();
    }
}
