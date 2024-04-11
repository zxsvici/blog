package cn.cj.vici.blog.controller;

import cn.cj.vici.blog.enums.BaseConfigType;
import cn.cj.vici.blog.model.entity.BaseConfig;
import cn.cj.vici.blog.model.entity.Friend;
import cn.cj.vici.blog.model.res.FriendsRes;
import cn.cj.vici.blog.service.BaseConfigService;
import cn.cj.vici.blog.service.FriendService;
import cn.cj.vici.blog.util.JsonUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping(path = "/friends")
public class FriendController {

    @Resource
    private BaseConfigService service;
    @Resource
    private FriendService friendService;

    @GetMapping
    public FriendsRes index() {
        List<BaseConfig> configs = service.queryByType(BaseConfigType.FRIEND.name());
        String value = configs.get(0).getValue();
        FriendsRes res = JsonUtil.strToObj(value, FriendsRes.class);
        List<Friend> list = friendService.list();
        res.setList(list);
        return res;
    }
}
