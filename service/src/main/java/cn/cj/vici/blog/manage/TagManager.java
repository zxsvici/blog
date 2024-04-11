package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Tag;

import java.util.List;

public interface TagManager {
    Tag create(Tag tag);

    Tag update(Tag tag);

    Tag delete(Integer id);

    Tag get(Integer id);

    List<Tag> list();

    PageView<Tag> page(Integer page, Integer size);
}
