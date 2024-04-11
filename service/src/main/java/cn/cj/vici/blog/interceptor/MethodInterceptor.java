package cn.cj.vici.blog.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

@Component
public class MethodInterceptor extends HandlerInterceptorAdapter {

    private ThreadLocal<Method> handlerMethod = new ThreadLocal<>();

    /**
     * This implementation always returns <code>true</code>.
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            HandlerMethod handler1 = (HandlerMethod) handler;
            Method method = handler1.getMethod();
            handlerMethod.set(method);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    /**
     * This implementation is empty.
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    /**
     * This implementation is empty.
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        handlerMethod.remove();
    }

    /**
     * 获取处理方法
     *
     * @return
     */
    public Method getHandlerMethod() {
        return handlerMethod.get();
    }
}
