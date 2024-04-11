package cn.cj.vici.blog.service;

import cn.cj.vici.blog.mapper.CommentMapper;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Comment;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Resource
    private CommentMapper mapper;

    public List<Comment> selectByRootIdIn(List<Integer> rootIdList) {
        QueryWrapper<Comment> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Comment> lambda = wrapper.lambda();
        lambda.in(Comment::getRootId, rootIdList);
        lambda.eq(Comment::getDeleteFlag, false);
        return mapper.selectList(wrapper);
    }

    public Boolean save(Comment comment) {
        mapper.insert(comment);
        return true;
    }

    public Comment exists(Integer id) {
        Comment comment = mapper.selectById(id);
        return Optional.ofNullable(comment).orElseThrow(RuntimeException::new);
    }

    public PageView<Comment> page(Integer bid, Integer parentId, Integer rootId, Integer pageNo, Integer pageSize) {
        QueryWrapper<Comment> wrapper = buildQueryWrapper(bid, rootId, parentId);
        Page<Comment> commentPage = mapper.selectPage(new Page<>(pageNo, pageSize), wrapper);
        return PageView.fromPage(commentPage);
    }

    public void update(Comment comment) {
        mapper.updateById(comment);
    }

    public List<Comment> list(Integer bid, Integer rootId, Integer parentId) {
        QueryWrapper<Comment> wrapper = buildQueryWrapper(bid, rootId, parentId);
        return mapper.selectList(wrapper);
    }

    public List<Comment> list(List<Integer> rootIdList) {
        QueryWrapper<Comment> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Comment> lambda = wrapper.lambda();
        lambda.in(Comment::getRootId, rootIdList);
        return mapper.selectList(wrapper);
    }

    private QueryWrapper<Comment> buildQueryWrapper(Integer bid, Integer rootId, Integer parentId) {
        QueryWrapper<Comment> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Comment> lambda = wrapper.lambda();
        lambda.eq(bid != 0, Comment::getBlogId, bid);
        lambda.eq(parentId != 0, Comment::getParentId, parentId);
        lambda.eq(rootId > 0, Comment::getRootId, rootId);
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String path = request.getServletPath();
        lambda.eq(!path.startsWith("/admin"), Comment::getDeleteFlag, false);
        lambda.orderBy(true, true, Comment::getId);
        return wrapper;
    }
}
