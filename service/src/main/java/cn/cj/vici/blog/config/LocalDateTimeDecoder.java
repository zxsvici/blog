package cn.cj.vici.blog.config;

import com.jsoniter.JsonIterator;
import com.jsoniter.spi.Decoder;
import com.jsoniter.spi.JsonException;

import java.io.IOException;
import java.time.LocalDateTime;

public class LocalDateTimeDecoder implements Decoder {
    @Override
    public LocalDateTime decode(JsonIterator iter) throws IOException {
        // 在此处实现将JSON数据转换为LocalDateTime的逻辑
        try {
            String json = iter.readString();
            // 解析json字符串并返回LocalDateTime对象
            return LocalDateTime.parse(json);
        } catch (Exception e) {
            throw new JsonException(e);
        }
    }
}
