package cn.cj.vici.blog.config;

import cn.cj.vici.blog.interceptor.MethodInterceptor;
import cn.cj.vici.blog.model.BaseView;
import com.jsoniter.output.JsonStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.lang.reflect.Method;
import java.util.Objects;

/**
 * 控制响应处理，控制统一格式(RestResult)输出
 */
@ControllerAdvice
public class GlobalResponseHandler implements ResponseBodyAdvice<Object> {

    private final MethodInterceptor methodInterceptor;

    @Autowired
    public GlobalResponseHandler(MethodInterceptor methodInterceptor) {
        this.methodInterceptor = methodInterceptor;
    }

    @Override
    public Object beforeBodyWrite(Object returnValue, MethodParameter methodParameter,
                                  MediaType mediaType, Class clazz,
                                  ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        // 无响应时输出服务异常
        if (Objects.isNull(returnValue)) {
            return BaseView.fail();
        }
        // 针对String返回类型做特殊处理
        Method handlerMethod = methodInterceptor.getHandlerMethod();
        if (Objects.nonNull(handlerMethod)) {
            Class<?> returnType = handlerMethod.getReturnType();
            if (returnType.isAssignableFrom(String.class) && returnType != Object.class) {
                if (returnValue instanceof BaseView) {
                    return JsonStream.serialize(returnType);
                } else if (returnValue instanceof String) {
                    return JsonStream.serialize(BaseView.success(returnValue));
                }
            }
        }
        if(returnValue instanceof BaseView) {
            return returnValue;
        }
        return BaseView.success(returnValue);
    }

    @Override
    public boolean supports(MethodParameter methodParameter, Class clazz) {
        // 获取当前处理请求的controller的方法
        Class<?> containingClass = methodParameter.getContainingClass();
        return containingClass.getCanonicalName().startsWith("cn.cj");
    }

}
