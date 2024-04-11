package cn.cj.vici.blog.convert;

import cn.cj.vici.blog.model.entity.Blog;
import cn.cj.vici.blog.model.res.BlogListItem;
import cn.cj.vici.blog.model.vo.BlogVO;
import cn.cj.vici.blog.util.BeanUtil;
import cn.cj.vici.blog.util.JsonUtil;
import com.jsoniter.output.JsonStream;

import java.util.List;

public class BlogConverter {

    public static Blog fromVo(BlogVO vo) {
        Blog res = BeanUtil.convert(vo, Blog.class);
        return res;
    }

    public static BlogVO toVo(Blog entity) {
        BlogVO res = BeanUtil.convert(entity, BlogVO.class);
//        List<Integer> idList = JsonUtil.strToList(entity.getTagIdList(), Integer.class);
//        res.setTagIdList(idList);
        return res;
    }
}
