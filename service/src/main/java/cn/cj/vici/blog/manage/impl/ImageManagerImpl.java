package cn.cj.vici.blog.manage.impl;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.config.BlogConfig;
import cn.cj.vici.blog.constants.CommonConstants;
import cn.cj.vici.blog.manage.ImageManager;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.nio.file.Files;
import java.nio.file.Paths;

@Manager
public class ImageManagerImpl implements ImageManager {

    @Resource
    private BlogConfig blogConfig;

    @Override
    public String upload(MultipartFile file) {
        String dir = blogConfig.getStaticDir();
        String fileName = System.currentTimeMillis() + CommonConstants.UNDERLINE + file.getOriginalFilename();
        String path = dir + CommonConstants.OBLIQUE_LINE + fileName;
        try {
            Files.copy(file.getInputStream(), Paths.get(path));
        }catch (Exception e) {
            throw new RuntimeException();
        }
        String result = blogConfig.getStaticPrefix() + fileName;
        if(blogConfig.getIsDev()) {
            return blogConfig.getDevServerUrl() + result;
        }
        return result;
    }
}
