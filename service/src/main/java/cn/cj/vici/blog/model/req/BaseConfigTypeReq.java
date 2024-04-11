package cn.cj.vici.blog.model.req;

import cn.cj.vici.blog.model.entity.BaseConfig;
import lombok.Data;

import java.util.List;

@Data
public class BaseConfigTypeReq {

    private String type;

    private List<BaseConfig> configList;

}
