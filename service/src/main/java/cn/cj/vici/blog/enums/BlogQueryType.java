package cn.cj.vici.blog.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BlogQueryType {

    SUMMARY(1),
    NOT_CONTAIN_CONTENT(2),
    ALL(0)
    ;

    private final int code;

    public static BlogQueryType byCode(Integer code) {
        for (BlogQueryType value : values()) {
            if(value.code == code) {
                return value;
            }
        }
        throw new RuntimeException();
    }
}
