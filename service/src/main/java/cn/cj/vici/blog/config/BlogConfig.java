package cn.cj.vici.blog.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "blog")
@Component
@Data
public class BlogConfig {

    private Boolean isDev = false;

    private String staticDir = "/usr/local/blog/static";

    private String staticPrefix = "/static/";

    private String devServerUrl = "http://127.0.0.1:8001";

    private String admin = "admin";

    private String password = "admin123";

}
