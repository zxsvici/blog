package cn.cj.vici.blog.model.vo;

import cn.cj.vici.blog.enums.AccountEnum;
import lombok.Data;

@Data
public class VisitorVO {

    private AccountEnum type;

    private String account;

    private String avatarUrl;

}
