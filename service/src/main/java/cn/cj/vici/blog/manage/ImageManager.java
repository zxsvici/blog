package cn.cj.vici.blog.manage;

import org.springframework.web.multipart.MultipartFile;

public interface ImageManager {
    String upload(MultipartFile file);
}
