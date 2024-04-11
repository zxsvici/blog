package cn.cj.vici.blog.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class BaseException extends RuntimeException{
    private int code;

    public BaseException(int code, String message) {
        super(message);
        this.code = code;
    }
}
