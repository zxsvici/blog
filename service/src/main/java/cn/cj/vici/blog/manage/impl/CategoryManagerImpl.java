package cn.cj.vici.blog.manage.impl;

import cn.cj.vici.blog.service.CategoryService;
import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.manage.CategoryManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Category;

import javax.annotation.Resource;
import java.util.List;

@Manager
public class CategoryManagerImpl implements CategoryManager {

    @Resource
    private CategoryService categoryService;


    @Override
    public Category create(Category category) {
        categoryService.create(category);
        return category;
    }

    @Override
    public Category update(Category category) {
        Category exist = categoryService.exist(category.getId());
        categoryService.update(category);
        return category;
    }

    @Override
    public Category delete(Integer id) {
        Category exist = categoryService.exist(id);
        categoryService.delete(id);
        return exist;
    }

    @Override
    public PageView<Category> page(Integer page, Integer size) {
        return categoryService.page(page, size);
    }

    @Override
    public List<Category> list() {
        return categoryService.list();
    }

    @Override
    public Category get(Integer id) {
        return categoryService.exist(id);
    }
}
