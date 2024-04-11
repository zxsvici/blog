package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.convert.BlogConverter;
import cn.cj.vici.blog.manage.BlogManager;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Blog;
import cn.cj.vici.blog.model.vo.BlogQueryVO;
import cn.cj.vici.blog.model.vo.BlogVO;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/admin/blogs")
public class AdminBlogController {

    @Resource
    private BlogManager manager;

    @PostMapping
    public BlogVO save(@RequestBody BlogVO vo) {
        return manager.save(vo);
    }

    @GetMapping
    public List<BlogVO> list(BlogQueryVO query) {
        return manager.list(query);
    }

    @GetMapping(path = "/page")
    public PageView<BlogVO> page(BlogQueryVO query, Integer pageNo, Integer pageSize) {
        pageNo = Optional.ofNullable(pageNo).orElse(1);
        pageSize = Optional.ofNullable(pageSize).orElse(10);
        return manager.page(query, pageNo, pageSize);
    }

    @GetMapping(path = "/get/{id}")
    public BlogVO get(@PathVariable Integer id) {
        return manager.get(id);
    }

    @GetMapping(path = "/delete/{id}")
    public BlogVO delete(@PathVariable Integer id) {
        return manager.delete(id);
    }

    @GetMapping(path = "/public/{id}/{flag}")
    public Boolean enable(@PathVariable Integer id, @PathVariable Boolean flag) {
        return manager.enable(id, flag);
    }

    @GetMapping(path = "/top/{id}/{flag}")
    public Boolean top(@PathVariable Integer id, @PathVariable Boolean flag) {
        return manager.top(id, flag);
    }

    @GetMapping(path = "/comment/{id}/{flag}")
    public Boolean comment(@PathVariable Integer id, @PathVariable Boolean flag) {
        return manager.comment(id, flag);
    }

}
