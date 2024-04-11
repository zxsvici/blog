package cn.cj.vici.blog.interceptor;

import cn.cj.vici.blog.exception.BaseException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component
public class AdminVerifyInterceptor extends HandlerInterceptorAdapter {

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("vici-token");
        if (token == null) {
            throw new BaseException(401, "token为空");
        }
        String redisToken = redisTemplate.opsForValue().get("vici-token");
        if (redisToken == null || !redisToken.equals(token)) { 
            throw new BaseException(401, "token无效");
        }
        redisTemplate.expire("vici-token", 30, TimeUnit.MINUTES);
        return true;
    }
}
