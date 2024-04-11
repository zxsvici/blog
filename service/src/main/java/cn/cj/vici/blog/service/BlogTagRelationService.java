package cn.cj.vici.blog.service;

import cn.cj.vici.blog.mapper.BlogTagMapper;
import cn.cj.vici.blog.model.entity.BlogTag;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogTagRelationService {

    @Resource
    private BlogTagMapper mapper;

    public void save(Integer tagId, Integer blogId) {
        this.save(Collections.singletonList(tagId), blogId);
    }

    public void save(List<Integer> tagIdList, Integer blogId) {
        List<BlogTag> tags = tagIdList.stream().map(tagId -> {
            BlogTag entity = new BlogTag();
            entity.setBlogId(blogId);
            entity.setTagId(tagId);
            return entity;
        }).collect(Collectors.toList());
        this.save(tags);
    }

    public void save(List<BlogTag> relationList) {
        relationList.forEach(relation -> {
            mapper.insert(relation);
        });
    }

    public List<Integer> findTagIdListByBlogId(Integer blogId) {
        List<BlogTag> relationList = findBlogTagRelationByBlogId(blogId);
        return relationList.stream().map(BlogTag::getTagId).collect(Collectors.toList());
    }

    public List<Integer> findBlogIdListByTagId(Integer tagId) {
        return null;
    }

    public List<BlogTag> findBlogTagRelationByBlogId(Integer blogId) {
        return findBlogTagRelationByBlogIdList(Collections.singletonList(blogId));
    }

    public List<BlogTag> findBlogTagRelationByTagId(Integer tagId) {
        return findBlogTagRelationByBlogIdList(Collections.singletonList(tagId));
    }

    public List<BlogTag> findBlogTagRelationByBlogIdList(List<Integer> blogIdList) {
        QueryWrapper<BlogTag> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<BlogTag> lambda = wrapper.lambda();
        lambda.in(BlogTag::getBlogId, blogIdList);
        return mapper.selectList(wrapper);
    }

    public void update(List<Integer> tagIdList, Integer blogId) {
        if(CollectionUtils.isEmpty(tagIdList)) {
            return;
        }
        List<Integer> oldTagIdList = this.findTagIdListByBlogId(blogId);
        List<Integer> removeList = new ArrayList<>();
        oldTagIdList.forEach(oldTagId -> {
            if(tagIdList.contains(oldTagId)) {
                tagIdList.remove(oldTagId);
            }else {
                removeList.add(oldTagId);
            }
        });
        this.save(tagIdList, blogId);
        this.delete(removeList, blogId);
    }

    private void delete(List<Integer> removeList, Integer blogId) {
        if (CollectionUtils.isEmpty(removeList)) {
            return;
        }
        QueryWrapper<BlogTag> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<BlogTag> lambda = wrapper.lambda();
        lambda.eq(BlogTag::getBlogId, blogId);
        lambda.in(BlogTag::getTagId, removeList);
        mapper.delete(wrapper);
    }

    public List<BlogTag> all() {
        return mapper.selectList(new QueryWrapper<>());
    }
}
