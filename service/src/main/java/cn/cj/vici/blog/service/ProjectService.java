package cn.cj.vici.blog.service;

import cn.cj.vici.blog.mapper.ProjectMapper;
import cn.cj.vici.blog.model.entity.Project;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Resource
    private ProjectMapper mapper;


    public List<Project> list() {
        return mapper.selectList(new QueryWrapper<>());
    }

    public Project get(Integer id) {
        return this.exists(id);
    }

    private Project exists(Integer id) {
        return Optional.ofNullable(mapper.selectById(id)).orElseThrow(RuntimeException::new);
    }
}
