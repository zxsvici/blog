package cn.cj.vici.blog.service;

import cn.cj.vici.blog.mapper.BaseConfigMapper;
import cn.cj.vici.blog.model.entity.BaseConfig;
import cn.cj.vici.blog.model.req.BaseConfigTypeReq;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class BaseConfigService {

    @Resource
    private BaseConfigMapper mapper;

    public List<BaseConfig> queryByType(String type) {
        BaseConfig query = new BaseConfig();
        query.setType(type);
        return mapper.selectList(new QueryWrapper<>(query));
    }

    public BaseConfig get(Integer id) {
        return null;
    }

    public Boolean save(BaseConfigTypeReq req) {
        String type = req.getType();
        List<BaseConfig> configList = req.getConfigList();
        Map<Integer, BaseConfig> oldConfigMap = this.queryByType(type).stream().collect(Collectors.toMap(BaseConfig::getId, Function.identity()));
        configList.forEach(item -> {
            Integer id = item.getId();
            if(oldConfigMap.containsKey(id)) {
                mapper.updateById(item);
                oldConfigMap.remove(id);
            }else {
                if(item.getNameCn() == null) {
                    item.setNameCn(item.getNameEn());
                }
                item.setType(type);
                mapper.insert(item);
            }
        });
        oldConfigMap.keySet().forEach(mapper::deleteById);
        return true;
    }
}
