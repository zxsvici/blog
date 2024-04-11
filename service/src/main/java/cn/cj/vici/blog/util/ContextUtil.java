package cn.cj.vici.blog.util;

import cn.cj.vici.blog.annotation.Util;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Util
public class ContextUtil {

    public Boolean isAdminRequest() {
        HttpServletRequest request = getRequest();
        return request.getServletPath().startsWith("/admin");
    }

    private HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }
}
