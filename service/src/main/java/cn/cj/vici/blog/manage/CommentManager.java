package cn.cj.vici.blog.manage;

import cn.cj.vici.blog.annotation.Manager;
import cn.cj.vici.blog.config.BlogConfig;
import cn.cj.vici.blog.model.PageView;
import cn.cj.vici.blog.model.entity.Comment;
import cn.cj.vici.blog.model.req.CommentReq;
import cn.cj.vici.blog.model.res.CommentListItem;
import cn.cj.vici.blog.service.ApiBlogService;
import cn.cj.vici.blog.service.BlogService;
import cn.cj.vici.blog.service.CommentService;
import cn.cj.vici.blog.util.BeanUtil;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Manager
public class CommentManager {

    private static final String QQ_URL = "https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=";
    private static final String GIT_URL = "https://api.github.com/users/";

    @Resource
    private BlogService blogService;
    @Resource
    private CommentService commentService;
    @Resource
    private RestTemplate restTemplate;
    @Resource
    private BlogConfig blogConfig;
    @Resource
    private ApiBlogService apiBlogService;


    public PageView<CommentListItem> page(Integer page, Integer size, Integer blogId) {
        // 查询所有根评论
        PageView<Comment> rootPage = commentService.page(blogId, -1, 0, page, size);
        if (CollectionUtils.isEmpty(rootPage.getList())) {
            return PageView.empty();
        }

        // 评论平面信息MAP
        Map<Integer, Comment> commentMap = new HashMap<>();
        // 根节点MAP
        Map<Integer, List<Comment>> rootChildMap = new HashMap<>();

        List<Integer> rootIdList = new ArrayList<>();
        rootPage.getList().forEach(item -> {
            Integer id = item.getId();
            rootIdList.add(id);
            commentMap.put(id, item);
        });
        // 查询所有子评论
        List<Comment> comments = commentService.selectByRootIdIn(rootIdList);

        comments.forEach(comment -> {
            Integer id = comment.getId();
            Integer rootId = comment.getRootId();
            Integer parentId = comment.getParentId();
            List<Comment> list;
            if (rootChildMap.containsKey(rootId)) {
                list = rootChildMap.get(rootId);
            } else {
                list = new ArrayList<>();
                rootChildMap.put(rootId, list);
            }
            // 当父评论被隐藏时，子评论不应该被展示
            if (!Objects.equals(parentId, rootId)
                    && rootChildMap.get(rootId).stream().noneMatch(item -> Objects.equals(item.getId(), parentId))) {
                return;
            }
            list.add(comment);
            commentMap.put(id, comment);
        });

        return PageView.convert(rootPage, (source) -> {
            CommentListItem target = BeanUtil.convert(source, CommentListItem.class);
            Integer id = source.getId();
            List<CommentListItem> children;
            if (rootChildMap.containsKey(id)) {
                children = rootChildMap.get(id).stream().map(comment -> {
                    CommentListItem convert = BeanUtil.convert(comment, CommentListItem.class);
                    convert.setParentNickname(commentMap.get(comment.getParentId()).getNickname());
                    return convert;
                }).collect(Collectors.toList());
            } else {
                children = new ArrayList<>();
            }
            target.setChildren(children);
            return target;
        });
    }

    public Boolean save(CommentReq req) {
        Comment entity = BeanUtil.convert(req, Comment.class);
        Integer blogId = req.getBlogId();
        if (blogId > 0) {
            apiBlogService.exists(blogId);
        }
        Integer parentId = req.getParentId();
        int rootId = -1;
        if (parentId > 0) {
            Comment parent = commentService.exists(parentId);
            Integer parentRootId = parent.getRootId();
            rootId = parentRootId == -1 ? parentId : parentRootId;
        }
        entity.setRootId(rootId);
        return commentService.save(entity);
    }

    public PageView<Comment> adminPage(Integer bid, Integer parentId, Integer rootId, Integer pageNo, Integer pageSize) {
        return commentService.page(bid, parentId, rootId, pageNo, pageSize);
    }

    public void enable(Integer id, Boolean enableFlag) {
        Comment comment = new Comment();
        comment.setId(id);
        comment.setDeleteFlag(!enableFlag);
        commentService.update(comment);
    }

    public List<Comment> list(Integer bid, Integer rootId, Integer parentId) {
        return commentService.list(bid, rootId, parentId);
    }

    public CommentListItem tree(Integer rootId) {
        Comment root = commentService.exists(rootId);
        List<Comment> list = commentService.list(0, rootId, 0);
        CommentListItem res = BeanUtil.convert(root, CommentListItem.class);
        res.setChildren(new ArrayList<>());
        Map<Integer, CommentListItem> itemMap = new HashMap<>();
        itemMap.put(rootId, res);
        list.forEach(it -> commentToItem(itemMap, it));
        return res;
    }

    public PageView<CommentListItem> allPage(Integer bid, Integer pageNo, Integer pageSize) {
        PageView<Comment> rootPage = commentService.page(bid, -1, 0, pageNo, pageSize);
        List<Comment> rootList = rootPage.getList();
        if(CollectionUtils.isEmpty(rootList)) {
            return PageView.empty();
        }
        List<Integer> rootIdList = rootList.stream().map(Comment::getId).collect(Collectors.toList());
        List<Comment> comments = commentService.list(rootIdList);
        Map<Integer, CommentListItem> itemMap = new HashMap<>();
        rootList.forEach(it -> commentToItem(itemMap, it));
        comments.forEach(it -> commentToItem(itemMap, it));
        List<CommentListItem> items = itemMap.values().stream().filter(item -> rootIdList.contains(item.getId())).collect(Collectors.toList());
        return PageView.<CommentListItem>builder().page(rootPage.getPage()).list(items).build();
    }

    private void commentToItem(Map<Integer, CommentListItem> map, Comment it) {
        CommentListItem item = BeanUtil.convert(it, CommentListItem.class);
        item.setChildren(new ArrayList<>());
        if(it.getParentId() != -1) {
            CommentListItem parent = map.get(it.getParentId());
            item.setParentNickname(parent.getNickname());
            // 如果父评论隐藏则子评论应当全部隐藏
            if (parent.getDeleteFlag()) {
                item.setDeleteFlag(true);
            }
            parent.getChildren().add(item);
        }
        map.put(it.getId(), item);
    }
}
