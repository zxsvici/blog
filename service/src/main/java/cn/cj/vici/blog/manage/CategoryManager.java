package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Category;

import java.util.List;

public interface CategoryManager {
    Category create(Category category);

    Category update(Category category);

    Category delete(Integer id);

    PageView<Category> page(Integer page, Integer size);

    List<Category> list();

    Category get(Integer id);
}
