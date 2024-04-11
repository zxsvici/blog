package cn.cj.vici.blog.config;

import cn.cj.vici.blog.interceptor.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Resource
    private MethodInterceptor methodInterceptor;
    @Resource
    private RequestCheckInterceptor requestCheckInterceptor;
//    @Resource
//    private AdminVerifyInterceptor adminVerifyInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(adminVerifyInterceptor).addPathPatterns("/admin/**");
        registry.addInterceptor(requestCheckInterceptor).addPathPatterns("/static/**");
        registry.addInterceptor(methodInterceptor).excludePathPatterns("/static/**");
    }

    public void removeInterceptor() {

    }


}
