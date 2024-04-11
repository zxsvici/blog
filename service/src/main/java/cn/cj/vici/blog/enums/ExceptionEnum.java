package cn.cj.vici.blog.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {

    SUCCESS(200, "success"),
    UNKNOWN_ERROR(500, "unknown error")
    ;

    private final int code;

    private final String msg;


}
