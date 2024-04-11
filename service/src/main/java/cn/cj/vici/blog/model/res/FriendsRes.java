package cn.cj.vici.blog.model.res;

import cn.cj.vici.blog.model.entity.Friend;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendsRes {

    private String content;

    private Boolean commentEnable;

    private List<Friend> list;
}
