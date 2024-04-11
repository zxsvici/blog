package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.manage.TagManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Tag;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/admin/tags")
public class TagAdminController {

    @Resource
    private TagManager manager;

    @PostMapping
    public Tag create(@RequestBody Tag tag) {
        return manager.create(tag);
    }

    @PutMapping(path = "/{id}")
    public Tag update(@RequestBody Tag tag, @PathVariable Integer id) {
        tag.setId(id);
        return manager.update(tag);
    }

    @DeleteMapping(path = "/{id}")
    public Tag delete(@PathVariable Integer id) {
        return manager.delete(id);
    }

    @GetMapping(path = "/{id}")
    public Tag get(@PathVariable Integer id) {
        return manager.get(id);
    }

    @GetMapping
    public List<Tag> list() {
        return manager.list();
    }

    @GetMapping(path = "/page/list")
    public PageView<Tag> page(Integer page, Integer size) {
        page = Optional.ofNullable(page).orElse(1);
        size = Optional.ofNullable(size).orElse(10);
        return manager.page(page, size);
    }
}
