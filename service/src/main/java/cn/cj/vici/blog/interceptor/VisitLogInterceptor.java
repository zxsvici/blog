package cn.cj.vici.blog.interceptor;

import cn.cj.vici.blog.service.BlogService;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Component
public class VisitLogInterceptor extends HandlerInterceptorAdapter {

    @Resource
    private BlogService blogService;
    @Resource
    private RequestMappingHandlerMapping handlerMapping;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 获取路径参数
        Map<String, String> pathVariables = (Map<String, String>) request
                .getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String id = pathVariables.get("id");
        blogService.view(Integer.parseInt(id));
        return true;
    }
}
