package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.model.entity.Project;
import cn.cj.vici.blog.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/projects")
public class ProjectController {

    @Resource
    private ProjectService projectService;

    @GetMapping("/{id}")
    public Project get(@PathVariable Integer id) {
        return projectService.get(id);
    }
}
