package cn.cj.vici.blog.util;

import com.jsoniter.JsonIterator;
import com.jsoniter.output.JsonStream;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class JsonUtil {

    public static <T> List<T> strToList(String json, Class<T> clazz) {
        json = Optional.ofNullable(json).orElse("[]");
        return JsonIterator.deserialize(json)
                .asList()
                .stream().map(item -> item.as(clazz))
                .collect(Collectors.toList());
    }

    public static <T> T strToObj(String json, Class<T> clazz) {
        return JsonIterator.deserialize(json).as(clazz);
    }

    public static <T> T mapObjToObj(Object obj, Class<T> clazz) {
        return JsonIterator.deserialize(JsonStream.serialize(obj)).as(clazz);
    }
}
