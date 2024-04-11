package cn.cj.vici.blog.model;

import cn.cj.vici.blog.exception.BaseException;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BaseView<T> {

    private int code;

    private T data;

    private String msg;

    private long timestamp;

    public static BaseView success(Object t) {
        return BaseView.builder()
                .code(200)
                .data(t)
                .timestamp(System.currentTimeMillis())
                .msg("ok")
                .build();
    }

    public static BaseView fail() {
        return BaseView.builder()
                .code(500)
                .timestamp(System.currentTimeMillis())
                .msg("unknown error")
                .build();
    }

    public static BaseView fail(String errorMsg) {
        return BaseView.builder()
                .code(500)
                .timestamp(System.currentTimeMillis())
                .msg(errorMsg)
                .build();
    }

    public static BaseView fail(int code, String errorMsg) {
        return BaseView.builder()
                .code(code)
                .timestamp(System.currentTimeMillis())
                .msg(errorMsg)
                .build();
    }

    public static BaseView fail(Throwable t) {
        return BaseView.builder()
                .code(500)
                .timestamp(System.currentTimeMillis())
                .msg(t.getMessage())
                .build();
    }

    public static BaseView fail(int code, Throwable t) {
        return BaseView.builder()
                .code(code)
                .timestamp(System.currentTimeMillis())
                .msg(t.getMessage())
                .build();
    }

    public static BaseView fail(BaseException e) {
        return BaseView.builder()
                .code(e.getCode())
                .timestamp(System.currentTimeMillis())
                .msg(e.getMessage())
                .build();
    }
}
