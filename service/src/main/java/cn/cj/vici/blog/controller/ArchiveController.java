package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.manage.ApiBlogManager;
import cn.cj.vici.blog.model.res.BlogListItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping(path = "/archives")
public class ArchiveController {

    @Resource
    private ApiBlogManager manager;

    @GetMapping
    public List<BlogListItem> index() {
        return manager.archives();
    }
}
