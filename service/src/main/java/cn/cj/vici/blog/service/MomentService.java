package cn.cj.vici.blog.service;

import cn.cj.vici.blog.mapper.MomentMapper;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Moment;
import cn.cj.vici.blog.util.ContextUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Optional;

@Service
public class MomentService {

    @Resource
    private MomentMapper mapper;
    @Resource
    private ContextUtil contextUtil;

    public PageView<Moment> page(Integer page, Integer size) {
        QueryWrapper<Moment> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Moment> lambda = wrapper.lambda();
        if(!contextUtil.isAdminRequest()) {
            lambda.eq(Moment::getPublicFlag, true);
        }
        lambda.eq(Moment::getDeleteFlag, false);
        lambda.orderByDesc(Moment::getCreateTime);
        Page<Moment> momentPage = mapper.selectPage(new Page<>(page, size), wrapper);
        return PageView.fromPage(momentPage);
    }

    public Moment exists(Integer id) {
        return Optional.ofNullable(mapper.selectById(id)).orElseThrow(RuntimeException::new);
    }

    public void save(Moment moment) {
        mapper.insert(moment);
    }

    public void update(Moment moment) {
        mapper.updateById(moment);
    }
}
