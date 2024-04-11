package cn.cj.vici.blog.service;

import cn.cj.vici.blog.constants.CommonConstants;
import cn.cj.vici.blog.convert.BlogConverter;
import cn.cj.vici.blog.mapper.BlogMapper;
import cn.cj.vici.blog.mapper.BlogTagMapper;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Blog;
import cn.cj.vici.blog.model.entity.BlogTag;
import cn.cj.vici.blog.model.vo.BlogVO;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogService {

    @Resource
    private BlogMapper blogMapper;
    @Resource
    private BlogTagMapper blogTagMapper;

    public void create(Blog entity) {
        blogMapper.insert(entity);
    }

    public void update(Blog entity) {
        entity.setUpdateTime(LocalDateTime.now());
        blogMapper.updateById(entity);
    }

    public List<Blog> list() {
        return this.list(null, null, null);
    }

    public List<Blog> list(Integer categoryId, List<Integer> tagIdList, String title) {
        QueryWrapper<Blog> wrapper = buildQueryWrapper(categoryId, tagIdList, title);
        return blogMapper.selectList(wrapper);
    }

    public Blog exist(Integer id) {
        Blog blog = blogMapper.selectById(id);
        return Optional.ofNullable(blog)
                .orElseThrow(RuntimeException::new);
    }

    public PageView<BlogVO> page(Integer categoryId, List<Integer> tagIdList, String title, Integer page, Integer size) {
        QueryWrapper<Blog> wrapper = buildQueryWrapper(categoryId, tagIdList, title);
        Page<Blog> blogPage = blogMapper.selectPage(new Page<>(page, size), wrapper);
        return PageView.fromPage(blogPage, BlogConverter::toVo);
    }

    public BlogVO delete(Integer id) {
        Blog entity = new Blog();
        entity.setId(id);
        entity.setDeleteFlag(true);
        int i = blogMapper.updateById(entity);
        return BlogConverter.toVo(entity);
    }

    public Boolean enable(Integer id, Boolean flag) {
        Blog entity = new Blog();
        entity.setId(id);
        entity.setPublicFlag(flag);
        int i = blogMapper.updateById(entity);
        return true;
    }

    public Boolean top(Integer id, Boolean flag) {
        Blog entity = new Blog();
        entity.setId(id);
        entity.setTopFlag(flag);
        blogMapper.updateById(entity);
        return true;

    }

    public Boolean comment(Integer id, Boolean flag) {
        Blog entity = new Blog();
        entity.setId(id);
        entity.setCommentFlag(flag);
        blogMapper.updateById(entity);
        return true;
    }

    private QueryWrapper<Blog> buildQueryWrapper(Integer categoryId, List<Integer> tagIdList, String title) {

        String inSql = buildInSql(tagIdList);

        QueryWrapper<Blog> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Blog> lambda = wrapper.lambda();
        lambda.eq(Blog::getDeleteFlag, false);
        lambda.eq( !ObjectUtils.isEmpty(categoryId), Blog::getCategoryId, categoryId)
                .inSql( !CollectionUtils.isEmpty(tagIdList), Blog::getId, inSql)
                .like( !ObjectUtils.isEmpty(title), Blog::getTitle, title);
        lambda.orderByDesc(Blog::getTopFlag,Blog::getCreateTime);
        return wrapper;
    }

    /**
     * 根据标签ID列表构建一个用于选择博客ID的SQL查询。
     * 查询将根据标签ID连接多个表，并返回匹配所有标签的博客ID。
     *
     * @param tagIdList 要根据过滤博客的标签ID列表。
     * @return 用于选择匹配博客ID的SQL查询字符串。
     */
    private String buildInSql(List<Integer> tagIdList) {
        if(CollectionUtils.isEmpty(tagIdList)) {
            return null;
        }
        int size = tagIdList.size();
        StringBuilder inSql = new StringBuilder(size * 50);
        inSql.append("SELECT tab_0.blog_id FROM ");
        for (int index = 0; index < size; index++) {
            Integer tagId = tagIdList.get(index);
            // SELECT blog_id FROM blog_tag_relation WHERE tag_id = #{tagId}) AS #{tempTableName}
            inSql.append("(SELECT blog_id FROM blog_tag_relation WHERE tag_id = ").append(tagId).append(") AS tab_").append(index);
            if(index > 0) {
                inSql.append(" ON tab_0.blog_id = ").append("tab_").append(index).append(".blog_id");
            }
            if(index < size - 1) {
                inSql.append(" INNER JOIN ");
            }
        }
        return inSql.toString();
    }

    public List<BlogTag> getBlogTag(Integer blogId) {
        QueryWrapper<BlogTag> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(BlogTag::getBlogId, blogId);
        return blogTagMapper.selectList(wrapper);
    }

    public void view(int id) {
        Blog blog = blogMapper.selectById(id);
        blog.setVisits(blog.getVisits() + 1);
        blogMapper.updateById(blog);
    }
}
