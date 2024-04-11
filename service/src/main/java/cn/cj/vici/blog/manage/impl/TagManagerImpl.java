package cn.cj.vici.blog.manage.impl;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.manage.TagManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Tag;
import cn.cj.vici.blog.service.TagService;

import javax.annotation.Resource;
import java.util.List;

@Manager
public class TagManagerImpl implements TagManager {

    @Resource
    private TagService tagService;

    @Override
    public Tag create(Tag tag) {
        tagService.create(tag);
        return tag;
    }

    @Override
    public Tag update(Tag tag) {
        tagService.update(tag);
        return tag;
    }

    @Override
    public Tag delete(Integer id) {
        Tag exist = tagService.exist(id);
        tagService.delete(id);
        return exist;
    }

    @Override
    public Tag get(Integer id) {
        return tagService.exist(id);
    }

    @Override
    public List<Tag> list() {
        return tagService.list();
    }

    @Override
    public PageView<Tag> page(Integer page, Integer size) {
        return tagService.page(page, size);
    }
}
