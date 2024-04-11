package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.manage.CommentManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Comment;
import cn.cj.vici.blog.model.req.CommentReq;
import cn.cj.vici.blog.model.res.CommentListItem;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Optional;

@RestController
@RequestMapping(path = "/comments")
public class CommentController {

    @Resource
    private CommentManager manager;

    @GetMapping
    public PageView<CommentListItem> page(Integer page, Integer size, Integer blogId) {
        page = Optional.ofNullable(page).orElse(1);
        size = Optional.ofNullable(size).orElse(10);
        return manager.page(page, size, blogId);
    }

    @PostMapping
    public Boolean save(@RequestBody CommentReq req) {
        return manager.save(req);
    }
}
