package cn.cj.vici.blog.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
public class TestController {

    @GetMapping(path = "/tt")
    public String aa() {
        return "sb";
    }

    @PostMapping(path = "upload")
    public String upload(HttpServletRequest request, MultipartFile file) throws IOException {
        String path = "F:/cj/project/vici-blog-service/vici-blog-service/src/main/resources/static/" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), Paths.get(path));
        return "http://127.0.0.1:8001/static/" + file.getOriginalFilename();
    }
}
