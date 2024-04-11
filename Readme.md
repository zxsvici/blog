## 前言
之前一直在使用<a href='https://naccl.top'>naccl</a>的<a href='https://github.com/Naccl/NBlog'>nblog</a>，这个博客是真的小而精美。

服务器ip密码泄漏啥都没有了，需要重新部署我的应用和博客，正好由于最近在学习前端，就想着自己实现一个博客来实践，原本打算后台用react，前台用vue的，结果vue写着感觉极不舒服，换成angular也不太舒服，最终整体的前端都用了react。
尝试自己设计但是很丑...所以整体风格抄的nblog

## 后端
- Spring Boot：核心框架
- Mybatis Plus：ORM框架
- Redis: 缓存数据，缩短接口响应时间、降低db压力
- MySQL：持久化存储数据

## 前台
- React：主题框架
- antd：整体组件UI
- axios：请求工具
- markdown-it：md文件转化html展示
- semantic：部分UI设置
- highlightjs：代码高亮
### 首页
![主页](./img/view/home.png)
### 首页博客列表
![主页博客列表](./img/view/home_blog_view_list.png)
### 博客详情
![博客页面](./img/view/blog_view_detail.png)
### 评论列表
![评论列表](./img/view/comments_view.png)
### 访客登录
![访者登录](./img/view/visitor_login.png)
### 登录后评论
![去评论](./img/view/to_comment.png)
### 回复评论
![去回复](./img/view/apply_comment.png)
### 归档
![归档](./img/view/archives.png)
### 友人帐
![友人帐](./img/view/friends.png)
### 博主信息
![关于](./img/view/about.png)
## 后台
- React：主题框架
- antd：整体组件UI
- axios：请求工具
- markdown-it：md文件转化html展示
- react-markdown-editor-lite：md编辑组件
### 首页
![视图](./img/admin/dashboard.png)
### 写博客
![写博客](./img/admin/write_blog.png)
### 写动态
![写动态](./img/admin/write_moment.png)
### 文章管理
![文章管理](./img/admin/blog_manager.png)
### 评论管理
![评论管理](./img/admin/comment_manage.png)
### 分类管理
![分类管理](./img/admin/categories.png)
### 标签管理
![标签管理](./img/admin/tags.png)
### 站点配置
![站点配置](./img/admin/site_config.png)
### 友链配置
![友链配置](./img/admin/friends.png)
### 个人信息配置
![个人信息配置](./img/admin/about.png)