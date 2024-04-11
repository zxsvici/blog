package cn.cj.vici.blog.controller.admin;

import cn.cj.vici.blog.manage.ImageManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/images")
public class ImageAdminController {

    @Resource
    private ImageManager manager;

    @PostMapping
    public String upload(MultipartFile file) {
        return manager.upload(file);
    }

}
