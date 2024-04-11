package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.enums.BaseConfigType;
import cn.cj.vici.blog.model.entity.BaseConfig;
import cn.cj.vici.blog.model.entity.Category;
import cn.cj.vici.blog.model.entity.Project;
import cn.cj.vici.blog.model.entity.Tag;
import cn.cj.vici.blog.model.res.AccountInfo;
import cn.cj.vici.blog.model.res.HobbyInfo;
import cn.cj.vici.blog.model.res.IntroductionRes;
import cn.cj.vici.blog.service.BaseConfigService;
import cn.cj.vici.blog.service.CategoryService;
import cn.cj.vici.blog.service.ProjectService;
import cn.cj.vici.blog.service.TagService;
import com.jsoniter.JsonIterator;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Manager
public class HomeManager {

    @Resource
    private CategoryService categoryService;
    @Resource
    private TagService tagService;
    @Resource
    private BaseConfigService baseConfigService;
    @Resource
    private ProjectService projectService;

    public List<Category> categories() {
        return categoryService.list();
    }

    public List<Tag> tags() {
        return tagService.list();
    }

    public IntroductionRes introduction() {
        IntroductionRes res = new IntroductionRes();
        List<BaseConfig> introduction = baseConfigService.queryByType(BaseConfigType.INTRODUCTION.name());
        introduction.forEach(in -> {
            String key = in.getNameEn();
            String value = in.getValue();
            switch (key) {
                case "avatar":
                    res.setAvatar(value);
                    break;
                case "name":
                    res.setName(value);
                    break;
                case "signature":
                    List<String> signature = Arrays.stream(value.split("\n")).collect(Collectors.toList());
                    res.setSignature(signature);
                    break;
                default:
                    break;
            }
        });

        List<BaseConfig> accountConfigList = baseConfigService.queryByType(BaseConfigType.ACCOUNT.name());
        List<AccountInfo> accountList = accountConfigList.stream().map(config -> {
            String value = config.getValue();
            return JsonIterator.deserialize(value, AccountInfo.class);
        }).collect(Collectors.toList());
        res.setAccountList(accountList);

        List<BaseConfig> hobbyConfigList = baseConfigService.queryByType(BaseConfigType.HOBBY.name());
        List<HobbyInfo> hobbyList = hobbyConfigList.stream().map(config -> {
            String key = config.getNameCn();
            String value = config.getValue();
            return new HobbyInfo(key, value);
        }).collect(Collectors.toList());
        res.setHobbyList(hobbyList);

        return res;
    }

    public List<Project> projects() {
        return projectService.list();
    }

    public Map<String, String> sites() {
        List<BaseConfig> configs = baseConfigService.queryByType(BaseConfigType.SITE.name());
        Map<String, String> map = configs.stream().collect(Collectors.toMap(BaseConfig::getNameEn, BaseConfig::getValue));
        return map;
    }
}
