package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Moment;
import cn.cj.vici.blog.service.MomentService;

import javax.annotation.Resource;

@Manager
public class MomentManager {

    @Resource
    private MomentService momentService;

    public PageView<Moment> page(Integer page, Integer size) {
        return momentService.page(page, size);
    }

    public Boolean like(Integer id) {
        Moment moment = momentService.exists(id);
        moment.setLikes(moment.getLikes() + 1);
        momentService.update(moment);
        return true;
    }

    public Moment get(Integer id) {
        return momentService.exists(id);
    }

    public Boolean save(Moment moment) {
        if(moment.getId() == null || moment.getId() == 0) {
            momentService.save(moment);
        } else {
            momentService.update(moment);
        }
        return true;
    }

    public Moment delete(Integer id) {
        Moment moment = momentService.exists(id);
        moment.setDeleteFlag(true);
        momentService.update(moment);
        return moment;
    }

    public Moment enable(Integer id, Boolean status) {
        Moment moment = momentService.exists(id);
        moment.setPublicFlag(status);
        momentService.update(moment);
        return moment;
    }
}
