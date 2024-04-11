package cn.cj.vici.blog.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;

public class BeanUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(BeanUtil.class);

    public static  <T> T convert(Object source, Class<T> clazz) {
        T t = null;
        try {
            t = clazz.newInstance();
            BeanUtils.copyProperties(source, t);
        }catch (Exception e) {
            LOGGER.error("bean转换异常");
            e.printStackTrace();
            throw new IllegalStateException();
        }
        return t;
    }
}
