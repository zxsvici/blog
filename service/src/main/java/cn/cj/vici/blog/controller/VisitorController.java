package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.enums.AccountEnum;
import cn.cj.vici.blog.manage.VisitorManager;
import cn.cj.vici.blog.model.entity.Visitor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/visitor")
public class VisitorController {

    @Resource
    private VisitorManager visitorManager;

    @PostMapping(path = "/login")
    public Boolean login() {
        return true;
    }

    @GetMapping(path = "/info")
    public Visitor info(String account, String type) {
        type = type.toUpperCase();
        return visitorManager.info(account, type);
    }
}
