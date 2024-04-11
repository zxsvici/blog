package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.manage.HomeManager;
import cn.cj.vici.blog.model.entity.Category;
import cn.cj.vici.blog.model.entity.Project;
import cn.cj.vici.blog.model.entity.Tag;
import cn.cj.vici.blog.model.res.IntroductionRes;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
public class HomeController {

    @Resource
    private HomeManager manager;

    @GetMapping(path = "/categories")
    public List<Category> categories() {
        return manager.categories();
    }

    @GetMapping(path = "/tags")
    public List<Tag> tags() {
        return manager.tags();
    }

    @GetMapping(path = "/introduction")
    public IntroductionRes introduction() {
        return manager.introduction();
    }

    @GetMapping("/projects")
    public List<Project> projects() {
        return manager.projects();
    }

    @GetMapping(path = "/sites")
    public Map<String, String> siteConfig() {
        return manager.sites();
    }


}
