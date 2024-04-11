package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.model.entity.BaseConfig;
import cn.cj.vici.blog.model.req.BaseConfigTypeReq;
import cn.cj.vici.blog.service.BaseConfigService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping(path = "/admin/config")
public class AdminConfigController {

    @Resource
    private BaseConfigService baseConfigService;

    @GetMapping(path = "/get/{id}")
    public BaseConfig get(@PathVariable Integer id) {
        return baseConfigService.get(id);
    }

    @GetMapping(path = "/type/{type}")
    public List<BaseConfig> get(@PathVariable String type) {
        return baseConfigService.queryByType(type);
    }

    @PostMapping(path = "/type")
    public Boolean save(@RequestBody BaseConfigTypeReq req) {
        return baseConfigService.save(req);
    }
}
