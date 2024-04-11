package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.context.CacheContext;
import cn.cj.vici.blog.enums.BlogQueryType;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Blog;
import cn.cj.vici.blog.model.entity.BlogTag;
import cn.cj.vici.blog.model.entity.Category;
import cn.cj.vici.blog.model.entity.Tag;
import cn.cj.vici.blog.model.res.BlogListItem;
import cn.cj.vici.blog.model.res.BlogRandomItem;
import cn.cj.vici.blog.model.res.BlogRes;
import cn.cj.vici.blog.service.*;
import cn.cj.vici.blog.util.BeanUtil;
import cn.cj.vici.blog.util.JsonUtil;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Manager
public class ApiBlogManager {

    @Resource
    private ApiBlogService apiBlogService;
    @Resource
    private TagService tagService;
    @Resource
    private CategoryService categoryService;
    @Resource
    private CacheContext cacheContext;
    @Resource
    private RedisCacheService redisCacheService;
    @Resource
    private BlogTagRelationService blogTagRelationService;

    public PageView<BlogListItem> index(Integer page, Integer size, Integer type, String searchKey) {

        PageView<Blog> source = apiBlogService.page(page, size, type, searchKey, BlogQueryType.NOT_CONTAIN_CONTENT.getCode());

        if(CollectionUtils.isEmpty(source.getList())) {
            return PageView.empty();
        }

        Map<Integer, Tag> tagMap = tagService.list().stream().collect(Collectors.toMap(Tag::getId, Function.identity()));
        Map<Integer, Category> categoryMap = categoryService.list().stream().collect(Collectors.toMap(Category::getId, Function.identity()));
        List<Integer> bolgIdList = source.getList().stream().map(Blog::getId).collect(Collectors.toList());
        Map<Integer, List<Integer>> tagIdListMap = getTagIdListMap(bolgIdList);
        return PageView.convert(source, (blog) -> {
            BlogListItem convert = BeanUtil.convert(blog, BlogListItem.class);
            convert.setCategory(categoryMap.get(blog.getCategoryId()));
            List<Integer> idList = tagIdListMap.get(blog.getId());
            List<Tag> tagList = idList.stream().map(tagMap::get).collect(Collectors.toList());
            convert.setTagList(tagList);
            return convert;
        });
    }

    public BlogRes get(Integer id) {
        Blog blog = apiBlogService.exists(id);
        blog.setVisits(blog.getVisits() + 1);
        apiBlogService.update(blog);
        Map<Integer, Tag> tagMap = tagService.list().stream().collect(Collectors.toMap(Tag::getId, Function.identity()));
        Map<Integer, Category> categoryMap = categoryService.list().stream().collect(Collectors.toMap(Category::getId, Function.identity()));
        Map<Integer, List<Integer>> tagIdListMap = getTagIdListMap(Collections.singletonList(id));
        BlogRes convert = BeanUtil.convert(blog, BlogRes.class);
        convert.setCategory(categoryMap.get(blog.getCategoryId()));
        List<Tag> tagList = tagIdListMap.get(id).stream().map(tagMap::get).collect(Collectors.toList());
        convert.setTagList(tagList);
        return convert;
    }

    public List<BlogRandomItem> random() {
        List<Blog> random = apiBlogService.random();
        List<BlogRandomItem> collect = random.stream().map(item -> {
            BlogRandomItem convert = BeanUtil.convert(item, BlogRandomItem.class);
            convert.setImg(item.getHeaderImage());
            return convert;
        }).collect(Collectors.toList());
        return collect;
    }

    public List<BlogListItem> archives() {
        List<Blog> list = apiBlogService.list();
        Map<Integer, Tag> tagMap = tagService.list().stream().collect(Collectors.toMap(Tag::getId, Function.identity()));
        Map<Integer, Category> categoryMap = categoryService.list().stream().collect(Collectors.toMap(Category::getId, Function.identity()));
        return list.stream().map(blog -> {
            BlogListItem convert = BeanUtil.convert(blog, BlogListItem.class);
            convert.setCategory(categoryMap.get(blog.getCategoryId()));
            List<Integer> idList = JsonUtil.strToList(blog.getTagIdList(), Integer.class);
            List<Tag> tagList = idList.stream().map(tagMap::get).collect(Collectors.toList());
            convert.setTagList(tagList);
            return convert;
        }).collect(Collectors.toList());
    }

    private Map<Integer, List<Integer>> getTagIdListMap(List<Integer> bolgIdList) {
        List<BlogTag> blogTagList = blogTagRelationService.findBlogTagRelationByBlogIdList(bolgIdList);
        Map<Integer, List<Integer>> tagIdListMap = new HashMap<>();
        blogTagList.forEach(blogTag -> {
            Integer blogId = blogTag.getBlogId();
            if(!tagIdListMap.containsKey(blogId)) {
                tagIdListMap.put(blogId, new ArrayList<>());
            }
            tagIdListMap.get(blogId).add(blogTag.getTagId());
        });
        return tagIdListMap;
    }
}
