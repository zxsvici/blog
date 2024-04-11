package cn.cj.vici.blog.config;

import cn.cj.vici.blog.enums.ExceptionEnum;
import cn.cj.vici.blog.exception.BaseException;
import cn.cj.vici.blog.model.BaseView;
import org.springframework.util.StringUtils;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 全局异常处理器
 */
@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {BaseException.class, Throwable.class, Exception.class})
    public BaseView allExceptionHandler(HttpServletRequest request, Exception exception) throws Exception {
        if (exception instanceof MethodArgumentNotValidException) {
            List<ObjectError> allErrors = ((MethodArgumentNotValidException) exception).getBindingResult().getAllErrors();
            StringBuilder builder = new StringBuilder();
            for (ObjectError allError: allErrors) {
                String defaultMessage = allError.getDefaultMessage();
                builder.append(defaultMessage).append(",");
            }
            String errorMessage = builder.toString();
            BaseView result = BaseView.fail();
            String message = "request exception";
            if (!StringUtils.isEmpty(errorMessage)) {
                message = errorMessage.substring(0, errorMessage.length() - 1);
            }
            result.setCode(ExceptionEnum.UNKNOWN_ERROR.getCode());
            result.setMsg(message);
            return result;
        } else if (exception instanceof BaseException) {
            BaseView result = BaseView.fail();
            result.setCode(((BaseException) exception).getCode());
            result.setMsg(exception.getMessage());
            return result;
        } else {
            return BaseView.fail(exception);
        }
    }

}
