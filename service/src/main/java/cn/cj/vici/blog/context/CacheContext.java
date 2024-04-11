package cn.cj.vici.blog.context;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class CacheContext {

    private static final Map<Integer, List<Integer>> TAG_BLOGS_MAP = new ConcurrentHashMap<>();
    private static final Map<Integer, List<Integer>> CATEGORY_BLOGS_MAP = new ConcurrentHashMap<>();
    private static final Map<String, Integer> TITLE_BLOG_MAP = Collections.synchronizedMap(new LinkedHashMap<>());
    private static final List<Integer> BLOG_ID_LIST = new ArrayList<>();

    public void addTagBlog(Integer tagId, Integer blogId) {
        if (!TAG_BLOGS_MAP.containsKey(tagId)) {
            TAG_BLOGS_MAP.put(tagId, new ArrayList<>());
        }
        TAG_BLOGS_MAP.get(tagId).add(blogId);
    }

    public void removeTagBlog(Integer tagId, Integer blogId) {
        if (!TAG_BLOGS_MAP.containsKey(tagId)) {
            throw new IllegalArgumentException();
        }
        TAG_BLOGS_MAP.get(tagId).remove(blogId);
    }

    public List<Integer> getTagBlogs(Integer tagId) {
        if (!TAG_BLOGS_MAP.containsKey(tagId)) {
            throw new IllegalArgumentException();
        }
        return TAG_BLOGS_MAP.get(tagId);
    }

    public void addCategoryBlog(Integer categoryId, Integer blogId) {
        if (!CATEGORY_BLOGS_MAP.containsKey(categoryId)) {
            CATEGORY_BLOGS_MAP.put(categoryId, new ArrayList<>());
        }
        CATEGORY_BLOGS_MAP.get(categoryId).add(blogId);
    }

    public void removeCategoryBlog(Integer categoryId, Integer blogId) {
        if (!CATEGORY_BLOGS_MAP.containsKey(categoryId)) {
            throw new IllegalArgumentException();
        }
        CATEGORY_BLOGS_MAP.get(categoryId).remove(blogId);
    }

    public List<Integer> getCategoryBlogs(Integer categoryId) {
        if (!CATEGORY_BLOGS_MAP.containsKey(categoryId)) {
            throw new IllegalArgumentException();
        }
        return CATEGORY_BLOGS_MAP.get(categoryId);
    }

    public void addTitleBlog(Integer blogId, String title) {
        TITLE_BLOG_MAP.put(title, blogId);
    }

    public void removeTitleBlog(String title, Integer blogId) {
        if(!TITLE_BLOG_MAP.containsKey(title)) {
            throw new IllegalArgumentException();
        }
        TITLE_BLOG_MAP.remove(title);
    }

    public List<Integer> searchTitle(String title, Integer pageNo, Integer pageSize) {
        int start = pageNo * pageSize - pageSize;
        int end = pageNo * pageSize;
        String regex = "^.*" + title + ".*$";
        List<Integer> list = new ArrayList<>();
        int index = 0;
        for (Map.Entry<String, Integer> entry : TITLE_BLOG_MAP.entrySet()) {
            if (entry.getKey().matches(regex)) {
                index++;
                if (index > end) {
                    break;
                }else if(index > start) {
                    list.add(entry.getValue());
                }
            }
        }
        return list;
    }

    public void addBlogId(Integer id) {
        if(!BLOG_ID_LIST.contains(id)) {
            BLOG_ID_LIST.add(id);
        }
    }

    public List<Integer> getBlogIdList() {
        return new ArrayList<>(BLOG_ID_LIST);
    }

}
