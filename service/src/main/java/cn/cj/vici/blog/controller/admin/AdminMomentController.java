package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.manage.MomentManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Moment;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Optional;

@RestController
@RequestMapping(path = "/admin/moments")
public class AdminMomentController {

    @Resource
    private MomentManager manager;

    @PostMapping
    public Boolean save(@RequestBody Moment moment) {
        return manager.save(moment);
    }

    @GetMapping(path = "/page")
    public PageView<Moment> page(Integer pageNo, Integer pageSize) {
        return manager.page(pageNo, pageSize);
    }

    @GetMapping(path = "/get/{id}")
    public Moment get(@PathVariable Integer id) {
        return manager.get(id);
    }

    @GetMapping(path = "/delete/{id}")
    public Moment delete(@PathVariable Integer id) {
        return manager.delete(id);
    }

    @GetMapping(path = "/public/{id}")
    public Moment enable(@PathVariable Integer id, Boolean status) {
        status = Optional.ofNullable(status).orElse(false);
        return manager.enable(id, status);
    }
}
