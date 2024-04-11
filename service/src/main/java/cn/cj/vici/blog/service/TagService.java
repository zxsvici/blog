package cn.cj.vici.blog.service;

import cn.cj.vici.blog.mapper.TagMapper;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Tag;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    @Resource
    private TagMapper tagMapper;

        public void create(Tag tag) {
        tagMapper.insert(tag);
    }

        public void update(Tag tag) {
        tagMapper.updateById(tag);
    }

        public Tag exist(Integer id) {
        Tag tag = tagMapper.selectById(id);
        return Optional.ofNullable(tag).orElseThrow(RuntimeException::new);
    }

        public void delete(Integer id) {
        Tag tag = new Tag();
        tag.setId(id);
        tag.setDeleteFlag(true);
        this.update(tag);
    }

        public List<Tag> list() {
        QueryWrapper<Tag> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Tag> lambda = wrapper.lambda();
        lambda.eq(Tag::getDeleteFlag, false);
        return tagMapper.selectList(wrapper);
    }

        public PageView<Tag> page(Integer page, Integer size) {
        QueryWrapper<Tag> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Tag> lambda = wrapper.lambda();
        lambda.eq(Tag::getDeleteFlag, false);
        Page<Tag> rows = tagMapper.selectPage(new Page<>(page, size), wrapper);
        return PageView.fromPage(rows);
    }
}
