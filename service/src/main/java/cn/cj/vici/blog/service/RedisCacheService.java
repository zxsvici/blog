package cn.cj.vici.blog.service;

import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.util.JsonUtil;
import com.jsoniter.output.JsonStream;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RedisCacheService {

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    public String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public <T> T get(String key, Class<T> clazz) {
        return JsonUtil.strToObj(redisTemplate.opsForValue().get(key), clazz);
    }

    public <T> List<T> getList(String key, Class<T> clazz) {
        Set<String> keys = this.keys(key);
        return this.getList(keys, clazz);
    }

    public <T> List<T> getList(Collection<String> keys, Class<T> clazz) {
        return redisTemplate.opsForValue().multiGet(keys)
                .stream().map(str -> JsonUtil.strToObj(str, clazz))
                .collect(Collectors.toList());
    }

    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, JsonStream.serialize(value));
    }

    public Set<String> keys(String pattern) {
        return redisTemplate.keys(pattern + "**");
    }
//
//    /**
//     * 从 Redis 中获取指定页码的分页数据。
//     *
//     * @param pageNo   页码
//     * @param pageSize 每页数据条数
//     * @param key      Redis 中有序集合的键
//     * @return         包含分页信息和获取的数据列表的 PageView 对象
//     */
//    public <T> PageView<T> page(Integer pageNo, Integer pageSize, String key, Class<T> clazz) {
//        // 步骤一：获取有序集合的成员总数
//        Long count = redisTemplate.opsForZSet().size(key);
//
//        // 步骤二：获取有序集合中指定范围的成员，并将其转换为列表
//        List<T> list = redisTemplate.opsForZSet()
//                .range(key, pageNo * pageSize - pageSize, Math.min(pageNo * pageSize, count)).stream()
//                .map(obj -> JsonUtil.strToObj(obj, clazz))
//                .collect(Collectors.toList());
//
//        // 步骤三：构建 PageView 对象，包括 PageInfo 分页信息和获取的成员列表
//        return PageView.<T>builder()
//                .page(PageView.PageInfo.builder()
//                        .pageNo(Long.valueOf(pageNo))
//                        .pageSize(Long.valueOf(pageSize))
//                        .total(count)
//                        .build())
//                .list(list)
//                .build();
//    }
//
//    /**
//     * 从给定的 Redis 键中获取指定项。
//     *
//     * @param key    Redis 键
//     * @param id     要获取的项的 ID
//     * @return       获取到的项，如果未找到则返回 null
//     */
//    public <T> T getPageItem(String key, Integer id) {
//        return (T) redisTemplate.opsForZSet().range(key, id, id).stream()
//                .map(obj -> (T) obj)
//                .findFirst()
//                .orElse(null);
//    }
//
//    public void add(String key, Object obj, Double store) {
//        redisTemplate.opsForZSet().add(key, JsonStream.serialize(obj), store);
//    }
//
//    public void remove(String key) {
//        redisTemplate.opsForZSet().removeRangeByScore(key, Double.MIN_VALUE, Double.MAX_VALUE);
//    }

}
