package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.config.BlogConfig;
import cn.cj.vici.blog.exception.BaseException;
import cn.cj.vici.blog.model.req.LoginReq;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(path = "/login")
public class AdminLoginController {

    @Resource
    private RedisTemplate<String, String> redisTemplate;
    @Resource
    private BlogConfig blogConfig;

    /**
     * 仅作为一个模拟情景
     * @param req
     * @param response
     * @return
     */
    @PostMapping
    public String login(@RequestBody LoginReq req, HttpServletResponse response) {
        if(blogConfig.getAdmin().equals(req.getUsername()) && blogConfig.getPassword().equals(req.getPassword())) {
            String uid = UUID.randomUUID().toString();
            redisTemplate.opsForValue().set("vici-token", uid, 30, TimeUnit.MINUTES);
            response.setHeader("vici-token", uid);
            return uid;
        }
        throw new BaseException(401, "用户名或密码错误");
    }
}
