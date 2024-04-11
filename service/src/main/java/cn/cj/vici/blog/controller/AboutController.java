package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.enums.BaseConfigType;
import cn.cj.vici.blog.model.entity.BaseConfig;
import cn.cj.vici.blog.model.res.AboutRes;
import cn.cj.vici.blog.service.BaseConfigService;
import cn.cj.vici.blog.util.JsonUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/about")
public class AboutController {

    @Resource
    private BaseConfigService service;

    @GetMapping
    public AboutRes index() {
        List<BaseConfig> configs = service.queryByType(BaseConfigType.ABOUT.name());
        String value = configs.get(0).getValue();
        AboutRes res = JsonUtil.strToObj(value, AboutRes.class);
        return res;
    }
}
