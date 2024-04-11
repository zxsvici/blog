package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.manage.FriendManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Friend;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/admin/friends")
public class AdminFriendController {

    @Resource
    private FriendManager manager;

    @GetMapping(path = "/page")
    public PageView<Friend> page(Integer pageNo, Integer pageSize) {
        return manager.page(pageNo, pageSize);
    }

    @GetMapping(path = "/enable/{id}")
    public Boolean enable(@PathVariable Integer id, Boolean status){
        return manager.enable(id, status);
    }
}
