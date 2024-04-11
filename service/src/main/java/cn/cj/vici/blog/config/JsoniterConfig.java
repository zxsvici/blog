package cn.cj.vici.blog.config;

import com.jsoniter.spi.Decoder;
import com.jsoniter.spi.Encoder;
import com.jsoniter.spi.JsoniterSpi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ObjectUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDateTime;

@Configuration
public class JsoniterConfig {

    public Encoder localDateTimeEncoder() {
        return (obj, stream) -> {
            if (obj == null) {
                stream.writeNull();
                return;
            }
            if (!(obj instanceof LocalDateTime)) {
                throw new IOException("Encoder LocalDateTime supports only LocalDateTime");
            }
            LocalDateTime dateTime = (LocalDateTime) obj;
            stream.writeVal(dateTime.toString());
        };
    }

    public Decoder localDateTimeDecoder() {
        return iter -> {
            String str = iter.readString();
            if(ObjectUtils.isEmpty(str)) {
                return null;
            }
            return LocalDateTime.parse(str);
        };
    }

    @PostConstruct
    public void config() {
        JsoniterSpi.registerTypeEncoder(LocalDateTime.class, localDateTimeEncoder());
        JsoniterSpi.registerTypeDecoder(LocalDateTime.class, localDateTimeDecoder());
    }
}
