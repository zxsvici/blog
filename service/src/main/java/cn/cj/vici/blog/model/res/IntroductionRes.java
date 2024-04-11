package cn.cj.vici.blog.model.res;

import cn.cj.vici.blog.model.entity.BaseConfig;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IntroductionRes {

    private String avatar;

    private String name;

    private List<String> signature;

    private List<AccountInfo> accountList;

    private List<HobbyInfo> hobbyList;
}
