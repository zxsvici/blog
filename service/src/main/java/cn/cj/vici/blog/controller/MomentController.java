package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.manage.MomentManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Moment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Optional;

@RestController
@RequestMapping(path = "/moments")
public class MomentController {

    @Resource
    private MomentManager manager;

    @GetMapping
    public PageView<Moment> page(Integer page, Integer size) {
        page = Optional.ofNullable(page).orElse(1);
        size = Optional.ofNullable(size).orElse(10);
        return manager.page(page, size);
    }

    @GetMapping(path = "/{id}/like")
    public Boolean like(@PathVariable Integer id) {
        return manager.like(id);
    }
}
