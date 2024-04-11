package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.config.BlogConfig;
import cn.cj.vici.blog.constants.CommonConstants;
import cn.cj.vici.blog.enums.AccountEnum;
import cn.cj.vici.blog.model.entity.Comment;
import cn.cj.vici.blog.model.entity.Visitor;
import cn.cj.vici.blog.service.VisitorService;
import com.jsoniter.JsonIterator;
import com.jsoniter.any.Any;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.io.FileOutputStream;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Manager
public class VisitorManager {

    private static final String QQ_URL = "https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=";
    private static final String GIT_URL = "https://api.github.com/users/";

    @Resource
    private VisitorService visitorService;
    @Resource
    private BlogConfig blogConfig;
    @Resource
    private RestTemplate restTemplate;

    public Visitor info(String account, String type) {
        AccountEnum accountEnum = AccountEnum.valueOf(type);
        switch (accountEnum) {
            case QQ:
                return requestQQ(account);
            case GIT:
                return requestGit(account);
            case GITEE:
                return requestGitee(account);
            default:
                return null;
        }
    }

    private Visitor requestGitee(String account) {
        return null;
    }

    private Visitor requestGit(String account) {
        Visitor visitor = new Visitor();
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(GIT_URL + account, String.class);
            Any any = JsonIterator.deserialize(response.getBody());
            visitor.setNickname(any.toString("name"));
            visitor.setAvatar(any.toString("avatar_url"));
        }catch (Exception e) {
            visitor.setNickname(account);
        }
        return visitor;
    }

    private Visitor requestQQ(String account) {
        Visitor visitor = new Visitor();
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(QQ_URL + account, String.class);
            String body = response.getBody();
            String pattern = "\\[.*?]";  // 匹配方括号内的任意内容
            Pattern p = Pattern.compile(pattern);
            Matcher m = p.matcher(body);
            while (m.find()) {
                String group = m.group();
                List<Any> list = JsonIterator.deserialize(group).asList();
                visitor.setNickname(list.get(list.size() - 2).toString());
                visitor.setAvatar(saveAvatar(list.get(0).toString(), account));
            }
        }catch (Exception e) {
            visitor.setNickname(account);
        }
        return visitor;
    }

    private String saveAvatar(String avatarUrl, String account) {
        String dir = blogConfig.getStaticDir();
        String fileName = account + CommonConstants.UNDERLINE + System.currentTimeMillis() + ".png";
        String path = dir + CommonConstants.OBLIQUE_LINE + fileName;
        String result = blogConfig.getStaticPrefix() + fileName;

        try {
            ResponseEntity<byte[]> response = restTemplate.getForEntity(avatarUrl, byte[].class);
            byte[] body = response.getBody();
            FileOutputStream fos = new FileOutputStream(path);
            fos.write(body);
            fos.flush();
            if(blogConfig.getIsDev()) {
                return blogConfig.getDevServerUrl() + result;
            }
            return result;
        }catch (Exception e) {
            throw new RuntimeException();
        }
    }
}
