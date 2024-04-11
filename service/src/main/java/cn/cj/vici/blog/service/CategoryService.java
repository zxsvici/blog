package cn.cj.vici.blog.service;

import cn.cj.vici.blog.mapper.CategoryMapper;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Category;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Resource
    private CategoryMapper categoryMapper;

        public void create(Category category) {
        categoryMapper.insert(category);
    }

        public void update(Category category) {
        categoryMapper.updateById(category);
    }

        public void delete(Integer id) {
        // check blog
        categoryMapper.deleteById(id);
    }

        public List<Category> list() {
        QueryWrapper<Category> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Category> lambda = wrapper.lambda();
        lambda.eq(Category::getDeleteFlag, false);
        return categoryMapper.selectList(wrapper);
    }

        public Category exist(Integer id) {
        Category category = categoryMapper.selectById(id);
        return Optional.ofNullable(category).orElseThrow(RuntimeException::new);
    }

        public PageView<Category> page(Integer page, Integer size) {
        QueryWrapper<Category> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Category> lambda = wrapper.lambda();
        lambda.eq(Category::getDeleteFlag, false);
        Page<Category> rows = categoryMapper.selectPage(new Page<>(page, size), wrapper);
        return PageView.fromPage(rows);
    }
}
