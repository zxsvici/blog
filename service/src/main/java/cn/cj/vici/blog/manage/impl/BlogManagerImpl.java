package cn.cj.vici.blog.manage.impl;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.convert.BlogConverter;
import cn.cj.vici.blog.manage.BlogManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Blog;
import cn.cj.vici.blog.model.entity.BlogTag;
import cn.cj.vici.blog.model.vo.BlogQueryVO;
import cn.cj.vici.blog.model.vo.BlogVO;
import cn.cj.vici.blog.service.BlogTagRelationService;
import cn.cj.vici.blog.service.BlogService;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

@Manager
public class BlogManagerImpl implements BlogManager {

    @Resource
    private BlogService blogService;
    @Resource
    private BlogTagRelationService blogTagRelationService;

    @Override
    public BlogVO save(BlogVO vo) {
        Blog entity = BlogConverter.fromVo(vo);
        List<Integer> tagIdList = vo.getTagIdList();
        boolean createFlag = entity.getId() == null || entity.getId() == 0;
        if(createFlag) {
            blogService.create(entity);
            blogTagRelationService.save(tagIdList, entity.getId());
        }else {
            blogService.update(entity);
            blogTagRelationService.update(tagIdList, entity.getId());
        }
        vo.setId(entity.getId());
        return vo;
    }

    @Override
    public List<BlogVO> list(BlogQueryVO query) {
        return blogService.list(query.getCategoryId(), query.getTagIdList(), query.getTitle())
                .stream().map(BlogConverter::toVo).collect(Collectors.toList());
    }

    @Override
    public BlogVO get(Integer id) {
        Blog entity = blogService.exist(id);
        BlogVO vo = BlogConverter.toVo(entity);
        List<Integer> tagIdList = blogTagRelationService.findTagIdListByBlogId(id);
        vo.setTagIdList(tagIdList);
        return vo;
    }

    @Override
    public PageView<BlogVO> page(BlogQueryVO query, Integer page, Integer size) {
        PageView<BlogVO> view = blogService.page(query.getCategoryId(), query.getTagIdList(), query.getTitle(), page, size);
        if(view.getList().isEmpty()) {
            return view;
        }
        List<Integer> idList = view.getList().stream().map(BlogVO::getId).collect(Collectors.toList());
        List<BlogTag> relationList = blogTagRelationService.findBlogTagRelationByBlogIdList(idList);
        Map<Integer, List<Integer>> blogTagMap = new HashMap<>();
        relationList.forEach(relation -> {
            Integer blogId = relation.getBlogId();
            Integer tagId = relation.getTagId();
            if(blogTagMap.containsKey(blogId)) {
                blogTagMap.get(blogId).add(tagId);
            }else {
                blogTagMap.put(blogId, new ArrayList<>(tagId));
            }
        });
        view.getList().forEach(item -> {
            item.setTagIdList(blogTagMap.get(item.getId()));
        });
        return view;
    }

    @Override
    public BlogVO delete(Integer id) {
        return blogService.delete(id);
    }

    @Override
    public Boolean enable(Integer id, Boolean flag) {
        blogService.exist(id);
        return blogService.enable(id, flag);
    }

    @Override
    public Boolean top(Integer id, Boolean flag) {
        blogService.exist(id);
        return blogService.top(id, flag);
    }

    @Override
    public Boolean comment(Integer id, Boolean flag) {
        Blog old = blogService.exist(id);
        old.setCommentFlag(flag);
        return blogService.comment(id, flag);
    }
}
