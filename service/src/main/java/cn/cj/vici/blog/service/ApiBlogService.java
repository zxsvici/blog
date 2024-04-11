package cn.cj.vici.blog.service;

import cn.cj.vici.blog.enums.BlogQueryType;
import cn.cj.vici.blog.mapper.BlogMapper;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Blog;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

@Service
public class ApiBlogService {

    @Resource
    private BlogMapper mapper;

    public PageView<Blog> page(Integer page, Integer size, Integer type, String searchKey, Integer selectType) {

        QueryWrapper<Blog> wrapper = buildWrapper(type, searchKey, selectType);
        Page<Blog> blogPage = mapper.selectPage(new Page<>(page, size), wrapper);
        return PageView.fromPage(blogPage);
    }

    public PageView<Blog> page(Integer page, Integer size, Integer type, String searchKey) {
        QueryWrapper<Blog> wrapper = buildWrapper(type, searchKey, BlogQueryType.ALL.getCode());
        Page<Blog> blogPage = mapper.selectPage(new Page<>(page, size), wrapper);
        return PageView.fromPage(blogPage);
    }

    public <T> PageView<T> page(Integer page, Integer size, Integer type, String searchKey, Function<Blog, T> converter) {
        PageView<Blog> view = page(page, size, type, searchKey, BlogQueryType.ALL.getCode());
        return PageView.convert(view, converter);
    }

    public <T> PageView<T> page(Integer page, Integer size, Integer type, String searchKey, Integer selectType, Function<Blog, T> converter) {
        PageView<Blog> view = page(page, size, type, searchKey,selectType);
        return PageView.convert(view, converter);
    }

    private QueryWrapper<Blog> buildWrapper(Integer queryType, String searchKey, Integer selectType) {
        QueryWrapper<Blog> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Blog> lambda = wrapper.lambda();
        BlogQueryType type = BlogQueryType.byCode(selectType);
        switch (type) {
            case SUMMARY:
                lambda.select(Blog::getId, Blog::getTitle, Blog::getCreateTime, Blog::getHeaderImage);
                break;
            case NOT_CONTAIN_CONTENT:
                lambda.select(Blog.class, info -> !Objects.equals(info.getColumn(), "content"));
                break;
            case ALL:
                break;
        }
        switch (queryType) {
            case 1:
                lambda.eq(Blog::getCategoryId, Integer.parseInt(searchKey));
                break;
            case 2:
                lambda.inSql(Blog::getId, "select blog_id from blog_tag_relation where tag_id = " + searchKey);
                break;
            case 3:
                lambda.and(likeWrapper -> {
                    likeWrapper.like(Blog::getTitle, searchKey).or();
                    likeWrapper.like(Blog::getContent, searchKey).or();
                    likeWrapper.like(Blog::getDescription, searchKey).or();
                });
                break;
            default:
                break;

        }
        lambda.orderByDesc(Blog::getTopFlag, Blog::getCreateTime);
        return wrapper;
    }

    public Blog exists(Integer id) {
        return Optional.ofNullable(mapper.selectById(id)).orElseThrow(RuntimeException::new);
    }

    public List<Blog> random() {
        QueryWrapper<Blog> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Blog> lambda = wrapper.lambda();
        lambda.eq(Blog::getPublicFlag, true);
        lambda.eq(Blog::getDeleteFlag, false);
        wrapper.last("order by rand() limit 5");
        return mapper.selectList(wrapper);
    }

    public List<Blog> list() {
        QueryWrapper<Blog> wrapper = buildWrapper(0, null, 2);
        return mapper.selectList(wrapper);
    }

    public void update(Blog blog) {
        mapper.updateById(blog);
    }
}
