package cn.cj.vici.blog.service;

import cn.cj.vici.blog.mapper.FriendMapper;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Friend;
import cn.cj.vici.blog.util.ContextUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
public class FriendService {

    @Resource
    private FriendMapper mapper;
    @Resource
    private ContextUtil contextUtil;

    public List<Friend> list() {
        QueryWrapper<Friend> wrapper = buildWrapper();
        return mapper.selectList(wrapper);
    }

    public PageView<Friend> page(Integer pageNo, Integer pageSize) {
        QueryWrapper<Friend> wrapper = buildWrapper();
        Page<Friend> friendPage = mapper.selectPage(new Page<>(pageNo, pageSize), wrapper);
        return PageView.fromPage(friendPage);
    }

    private QueryWrapper<Friend> buildWrapper() {
        QueryWrapper<Friend> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(!contextUtil.isAdminRequest(), Friend::getDeleteFlag, false);
        return wrapper;
    }

    public Friend exists(Integer id) {
        return Optional.ofNullable(mapper.selectById(id)).orElseThrow(RuntimeException::new);
    }

    public void enable(Integer id, Boolean status) {
        Friend friend = new Friend();
        friend.setId(id);
        friend.setDeleteFlag(!status);
        mapper.updateById(friend);
    }
}
