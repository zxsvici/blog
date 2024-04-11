package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Friend;
import cn.cj.vici.blog.model.res.FriendsRes;
import cn.cj.vici.blog.service.FriendService;

import javax.annotation.Resource;
import java.util.List;

@Manager
public class FriendManager {

    @Resource
    private FriendService friendService;

    public FriendsRes index() {

        List<Friend> list = friendService.list();

        FriendsRes res = new FriendsRes();
        res.setList(list);
        res.setCommentEnable(true);
        res.setContent("# FRIEND\nsb\n# TWO\naabb");
        return res;
    }

    public PageView<Friend> page(Integer pageNo, Integer pageSize) {
        return friendService.page(pageNo, pageSize);
    }

    public Boolean enable(Integer id, Boolean status) {
        Friend exists = friendService.exists(id);
        friendService.enable(id, status);
        return true;
    }
}
