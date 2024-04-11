package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.manage.CategoryManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Category;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/admin/categories")
public class CategoryAdminController {

    @Resource
    private CategoryManager manager;

    @PostMapping
    public Category create(@RequestBody Category category) {
        return manager.create(category);
    }

    @PutMapping(path = "/{id}")
    public Category update(@RequestBody Category category, @PathVariable Integer id) {
        category.setId(id);
        return manager.update(category);
    }

    @DeleteMapping(path = "/{id}")
    public Category delete(@PathVariable Integer id) {
        return manager.delete(id);
    }

    @GetMapping(path = "/page/list")
    public PageView<Category> page(Integer page, Integer size) {
        page = Optional.ofNullable(page).orElse(1);
        size = Optional.ofNullable(size).orElse(10);
        return manager.page(page, size);
    }

    @GetMapping
    public List<Category> list() {
        return manager.list();
    }

    @GetMapping(path = "/{id}")
    public Category get(@PathVariable Integer id) {
        return manager.get(id);
    }
}
