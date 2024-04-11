package cn.cj.vici.blog.init;

import cn.cj.vici.blog.constants.RedisCacheConstants;
import cn.cj.vici.blog.context.CacheContext;
import cn.cj.vici.blog.model.entity.Blog;
import cn.cj.vici.blog.model.entity.BlogTag;
import cn.cj.vici.blog.service.BlogService;
import cn.cj.vici.blog.service.BlogTagRelationService;
import cn.cj.vici.blog.service.RedisCacheService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

//@Component
public class CacheInit implements CommandLineRunner {

    @Resource
    private RedisCacheService redisCacheService;
    @Resource
    private CacheContext cacheContext;
    @Resource
    private BlogService blogService;
    @Resource
    private BlogTagRelationService blogTagRelationService;

    @Override
    public void run(String... args) throws Exception {
        List<Blog> blogList = blogService.list();
//        List<Integer> blogIdList = new ArrayList<>();
        blogList.stream().filter(Blog::getPublicFlag).forEach(item -> {
            Integer id = item.getId();
//            blogIdList.add(id);
            redisCacheService.set(RedisCacheConstants.BLOG_KEY_PREFIX + id, item);
            cacheContext.addTitleBlog(id, item.getTitle());
            cacheContext.addCategoryBlog(item.getCategoryId(), id);
            cacheContext.addBlogId(id);
        });
//        redisCacheService.set(RedisCacheConstants.BLOG_ID_LIST_KEY, blogIdList);

        List<BlogTag> blogTagList = blogTagRelationService.all();
        blogTagList.forEach(item -> {
            Integer blogId = item.getBlogId();
            Integer tagId = item.getTagId();
            cacheContext.addTagBlog(tagId, blogId);
        });
    }


}
