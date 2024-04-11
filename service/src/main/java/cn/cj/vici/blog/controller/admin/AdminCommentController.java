package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.manage.CommentManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Comment;
import cn.cj.vici.blog.model.res.CommentListItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/admin/comments")
public class AdminCommentController {

    @Resource
    private CommentManager manager;

    @GetMapping
    public PageView<Comment> page(Integer bid, Integer parentId, Integer pageNo, Integer pageSize, Integer rootId) {
        parentId = Optional.ofNullable(parentId).orElse(0);
        rootId = Optional.ofNullable(rootId).orElse(0);
        return manager.adminPage(bid, parentId, rootId, pageNo, pageSize);
    }

    @GetMapping(path = "/{id}/enable")
    public Boolean enable(@PathVariable Integer id, Boolean enableFlag) {
        manager.enable(id, enableFlag);
        return true;
    }

    @GetMapping(path = "/list")
    public List<Comment> list(Integer bid, Integer rootId, Integer parentId) {
        bid = Optional.ofNullable(bid).orElse(0);
        rootId = Optional.ofNullable(rootId).orElse(0);
        parentId = Optional.ofNullable(parentId).orElse(0);
        return manager.list(bid, rootId, parentId);
    }

    @GetMapping(path = "/tree/{rootId}")
    public CommentListItem tree(@PathVariable Integer rootId) {
        return manager.tree(rootId);
    }

    @GetMapping(path = "/{bid}/page")
    public PageView<CommentListItem> allPage(@PathVariable Integer bid, Integer pageNo, Integer pageSize) {
        pageNo = Optional.ofNullable(pageNo).orElse(1);
        pageSize = Optional.ofNullable(pageSize).orElse(10);
        return manager.allPage(bid, pageNo, pageSize);
    }
}
