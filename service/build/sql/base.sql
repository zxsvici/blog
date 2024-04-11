create table base_config
(
    id         int auto_increment
        primary key,
    name_en    varchar(32)          not null,
    name_cn    varchar(16)          not null,
    value      text                 not null,
    basic_flag tinyint(1) default 0 null,
    type       varchar(16)          null
);

INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (1, 'name', '昵称', '策君丶', 1, 'INTRODUCTION');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (2, 'avatar', '头像', '/img/avatar.jpg', 1, 'INTRODUCTION');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (3, 'signature', '个签', '一觉游仙好梦，任它竹冷松寒。
轩辕事，古今谈，风流河山。
沉醉负白首，舒怀成大观。
醒，亦在人间；
梦，亦在人间 。', 1, 'INTRODUCTION');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (5, 'git', 'git', '{"img":"/img/github.png","link":"http://127.0.0.1:5173","nickname":"sb"}', 0, 'ACCOUNT');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (6, 'bilibili', 'b站', '{"img":"/img/bilibili.png","link":"http://127.0.0.1:5173","nickname":"sb"}', 0, 'ACCOUNT');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (7, 'mail', '邮箱', '{"img":"/img/mail.png","link":"http://127.0.0.1:5173","nickname":"sb"}', 0, 'ACCOUNT');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (8, 'like_anime', '喜欢的动漫', 'acg', 1, 'HOBBY');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (9, 'like_girl', '喜欢的纸片人', '珂朵莉', 1, 'HOBBY');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (10, 'want_become', '想成为的人', '威廉111', 1, 'HOBBY');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (11, 'wyy', '网易云', '{"img":"/img/wyy.png","link":"http://127.0.0.1:5173","nickname":"sb"}', 0, 'ACCOUNT');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (12, 'beiAn', '备案号', '皖ICP备2021010576号-2', 1, 'SITE');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (13, 'siteImg', '网页首图', '/img/kdl2.jpg', 1, 'SITE');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (15, 'friend', '友人帐宣言', '{"commentEnable":true,"content":"<h1 style=\\"text-align: center\\">来交个朋友吧</h1><br/>\\n速来交朋友"}', 1, 'FRIEND');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (18, 'siteImgLeft', '网页首图左', '/img/kdl4.jpg', 1, 'SITE');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (19, 'siteImgRight', '网页首图左', '/img/kdl.jpg', 1, 'SITE');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (20, 'siteName', '站点名称', '策君丶Blog', 1, 'SITE');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (21, 'the_happiest_girl_in_the_world', '世界上最幸福的女孩', '珂朵莉', 1, 'HOBBY');
INSERT INTO base_config (id, name_en, name_cn, value, basic_flag, type) VALUES (23, 'about', '关于', '{"commentEnable":true,"content":"时代变了，我们不用再扮演其他角色，我们可以做自己了。对，真正的自己！<br/>过去的我经历失败、受过背叛、失去所有，<br/>而现在，我将掌控一切。这就是完全的赤鸳！完整的符华！！完整的我！！！<br/><h1>我将扭转万象！</h1>"}', 1, 'ABOUT');


create table blog
(
    id           int auto_increment
        primary key,
    title        varchar(32)                          not null,
    header_image varchar(128)                         null,
    description  text                                 null,
    content      text                                 not null,
    category_id  int                                  not null,
    tag_id_list  varchar(128)                         null,
    public_flag  tinyint(1) default 1                 null,
    comment_flag tinyint(1) default 1                 null,
    top_flag     tinyint(1) default 0                 null,
    delete_flag  tinyint(1) default 0                 null,
    create_time  datetime   default CURRENT_TIMESTAMP null,
    update_time  datetime   default CURRENT_TIMESTAMP null,
    visits       int        default 0                 null,
    pwd          varchar(16)                          null,
    words        int                                  null,
    read_time    mediumtext                           null
);

INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (1, 'blog_one_modify', 'http://127.0.0.1:8001/static/1690645784621_bg3.jpg', '# 排序（一）
本篇介绍最为基础的三种排序方法，选择排序、冒泡排序、插入排序。', '## 磨刀不误砍柴工
获取随机数组
```java
    /**
     * 准备随机数组，用于比较排序效率
     * @return
     */
    private static int[] getArray(){
        int[] result = new int[50000];
        for (int i = 0; i < 50000; i++) {
            result[i] =(int) Math.round(Math.random() * 50000);
        }
        return result;
    }
```
交换函数
```java
   /**
     * 交换
     * @param x 下标1
     * @param y 下标2
     * @param arr 数组
     */
    private static void swap(int x, int y, int[] arr){
        arr[x] = arr[x] ^ arr[y];
        arr[y] = arr[x] ^ arr[y];
        arr[x] = arr[x] ^ arr[y];
    }
```
输出检查是否有序
```java
    /**
     * 输出检查是否完成排序
     * @param arr 数组
     */
    private static void printf(int[] arr){
        for (int anArr : arr) {
            System.out.print(anArr + "  ");
        }
        System.out.println();
    }
```
## 选择排序
### 思想
- 在数组中选出极端元素，放在数组最前面做为已排序数组
- 在从未排序数组中继续重复第一步
### 特点
- 空间复杂度： O(1)
- 时间复杂度： O(n<sup>2</sup>)
- 平均：O(n<sup>2</sup>)
- 最快：O(n<sup>2</sup>)
- 最慢：O(n<sup>2</sup>)
- 稳定性：不稳定（即排序后会影响原来相等元素的相对位置）
```java
   /**
     * 选择排序 每次交换
     * @param arr 数组
     */
    private static void selectSort1(int[] arr){
        long start = System.currentTimeMillis();
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if(arr[j] < arr[i]){
                    swap(i,j,arr);
                }
            }
        }
        long end = System.currentTimeMillis();
//        printf(arr);
        System.out.println("selectSort1 ==>> " + (end - start));
    }
```

优化点：不必每次都去交换，可以只记录极端元素的下标，一次比较完成后在交换。
```java
    /**
     * 选择排序 记录下标，最后交换
     * @param arr 数组
     */
    private static void selectSort2(int[] arr){
        long start = System.currentTimeMillis();
        for (int i = 0; i < arr.length; i++) {
            int minIndex = i;
            for (int j = i+1; j < arr.length; j++) {
                minIndex = arr[minIndex] > arr[j] ? j : minIndex;
            }
            swap(minIndex,i,arr);
        }
        long end = System.currentTimeMillis();
//        printf(arr);
        System.out.println("selectSort2 ==>> " + (end - start));
    }
```

## 冒泡排序
### 思想
- 顾名思义，就是咕隆咕隆冒泡泡
- 进行最多 n-1 轮排序，每一轮的最大者都会位于数组最后
- 第 i 轮就是从 0 - i，由 0 开始和相邻的元素进行 1 v 1，结束后进行位次交换，继续开始下一场上路 1 v 1 男人大战
### 特点
- 空间复杂度： O(1)
- 时间复杂度： O(n<sup>2</sup>)
- 平均：O(n<sup>2</sup>)
- 最快：O(n)
- 最慢：O(n<sup>2</sup>)
- 稳定性：稳定

判断整体是否已经有序
```java
    /**
     * 冒泡排序 判断在一次冒泡后是否已经有序
     * @param arr 数组
     */
    private static void bubbleSort1(int[] arr){
        long start = System.currentTimeMillis();
        for (int i = arr.length - 1; i > 0; i--) {
            boolean flag = true;
            for (int j = 0; j < i; j++) {
                if(arr[j] > arr[j+1]){
                    swap(j+1,j,arr);
                    flag = false;
                }
            }
            if(flag) break;
        }
        long end = System.currentTimeMillis();
//        printf(arr);
        System.out.println("bubbleSort1 ==>> " + (end - start));
    }
```
记录上次排序最后 pk 的位置
```java
    /**
     * 冒泡排序 记录上一次冒泡的位置
     * @param arr
     */
    private static void bubbleSort2(int[] arr){
        long start = System.currentTimeMillis();
        for (int i = arr.length - 1; i > 0; i--) {
            int last = 0;
            for (int j = 0; j < i; j++) {
                if(arr[j+1] < arr[j]){
                    swap(j+1,j,arr);
                    last = i + 1;
                }
            }
            i = last;
        }
//        printf(arr);
        long end = System.currentTimeMillis();
        System.out.println("bubbleSort2 ==>> " + (end - start));
    }
```
优化点：可双向冒泡，小的往前，大的往后
```java
    /**
     * 冒泡排序 双向
     * @param arr
     */
    private static void bubbleSort3(int[] arr){
        long start = System.currentTimeMillis();
        int left = 0, right = arr.length-1;
        while(left < right){
            for (int i = left; i < right; i++) {
                if(arr[i] > arr[i+1]){
                    swap(i,i+1,arr);
                }
            }
            right--;
            for (int i = right; i > left; i--) {
                if(arr[i-1] > arr[i]){
                    swap(i-1,i,arr);
                }
            }
            left++;
        }
        long end = System.currentTimeMillis();
//        printf(arr);
        System.out.println("bubbleSort3 ==>> " + (end - start));
    }
}
```
## 插入排序
### 思想
- 将数组首位视为已经排好序的数组
- 每次取出已排序数组后的一个元素，插入到已排序的数组中，插入的位置要使数组仍然有序。
- 重复上一步
### 使用情景
- 数据量少
- 数据本身比较有序
### 特点
- 空间复杂度： O(1)
- 时间复杂度： O(n<sup>2</sup>)
- 平均：O(n<sup>2</sup>)
- 最快：O(n)
- 最慢：O(n<sup>2</sup>)
- 稳定性：稳定
```java
    /**
     * 插入排序 迁移
     * @param arr
     */
    private static void insertSort1(int[] arr){
        long start = System.currentTimeMillis();
        for (int i = 1; i < arr.length; i++) {
//            当前插入的目标值
            int target = arr[i];
            int j;
            for (j = i-1; j >= 0 && target < arr[j]; j--) {
                arr[j+1] = arr[j];
            }
            arr[j+1] = target;
        }
        long end = System.currentTimeMillis();
//        printf(arr);
        System.out.println("insertSort1 ==>> " + (end - start));
    }

    /**
     * 插入排序 交换
     * @param arr
     */
    private static void insertSort2(int[] arr){
        long start = System.currentTimeMillis();
        for (int i = 1; i < arr.length; i++) {
//            因为要交换，所以第二层循环的 j 要大于 0 防止下标越界
            for (int j = i; j > 0 && arr[j] < arr[j-1]; j--) {
                swap(j-1,j,arr);
            }
        }
//        printf(arr);
        long end = System.currentTimeMillis();
        System.out.println("insertSort2 ==>> " + (end - start));
    }
```
优化点：插入的关键在于寻找插入的位置，因为插入的是一个有序数组，所以这里我们可以用二分查找来提高排序的效率。
```java
    /**
     * 插入排序 二分查找插入位置
     * @param arr
     */
    private static void insertSort3(int[] arr){
        long start = System.currentTimeMillis();
        for (int i = 1; i < arr.length; i++) {
            int target = arr[i];
            int left = 0, right = i - 1;
//            二分查找插入位置
            while(left <= right){
                int mid = left + (right - left)/2;
                if(arr[mid] > target){
                    right = mid -1;
                }else {
                    left = mid + 1;
                }
            }
            for (int j = i - 1; j >= left ; j--) {
                arr[j+1] = arr[j];
            }
            arr[left] = target;
        }
        long end = System.currentTimeMillis();
//        printf(arr);
        System.out.println("insertSort3 ==>> " + (end - start));
    }
```
', 2, '[1,3]', 0, 1, 1, 0, '2023-08-30 21:33:43', '2023-08-30 21:33:43', 95, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (2, 'blog_two', 'http://127.0.0.1:8001/static/1690635858490_bg2.jpg', 'aaavvv', 'sv', 3, '[2,3]', 1, 1, 0, 0, '2023-08-28 21:33:43', '2023-08-28 21:33:43', 2, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (3, 'blog3', 'http://127.0.0.1:8001/static/1691474763289_reward.jpg', '3', '# 3 ', 3, '[2,4,3]', 1, 1, 0, 0, '2023-07-30 21:33:43', '2023-08-30 21:33:43', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (4, 'test_four', 'http://127.0.0.1:8001/static/1694356767291_xg5.jpg', 'abc', 'aaa', 4, null, 1, 1, 0, 1, '2023-08-30 21:33:43', '2023-08-28 21:33:43', 2, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (5, 'test_five', 'http://127.0.0.1:8001/static/1694357937443_xg3.jpg', 'test_five', 'test_five', 3, null, 1, 1, 0, 1, '2023-08-28 21:33:43', '2023-08-30 21:33:43', 2, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (6, 'test_six', 'http://127.0.0.1:8001/static/1694358082670_xg3.jpg', 'six', 'six', 2, null, 1, 1, 0, 1, '2023-07-30 21:33:43', '2023-08-28 21:33:43', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (7, 'sxi', 'http://127.0.0.1:8001/static/1694358207386_xg3.jpg', 'aaa', 'ccc', 4, null, 1, 1, 0, 1, '2023-08-30 21:33:43', '2023-08-30 21:33:43', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (8, 'senven', 'http://127.0.0.1:8001/static/1694358331595_xg3.jpg', 'ac', 'cc', 3, null, 1, 1, 0, 1, '2023-08-30 21:33:43', '2023-08-28 21:33:43', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (9, 'aaaa', 'http://127.0.0.1:8001/static/1694362160156_xg3.jpg', 'a', 'c', 2, null, 0, 0, 0, 1, '2023-08-28 21:33:43', '2023-07-30 21:33:43', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (10, 'ten_modify', 'http://127.0.0.1:8001/static/1694362380595_xg3.jpg', 'accc_aaa', 'aaaccc_bbb', 4, null, 1, 1, 0, 1, '2023-07-30 21:33:43', '2023-09-12 02:15:52', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (11, 'test_edit_one', 'http://127.0.0.1:8001/static/1694508518937_6.jpg', 'aaa', 'zzz', 3, null, 1, 1, 0, 0, '2023-07-30 21:33:43', '2023-09-12 02:15:52', 1, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (14, 'test_edit_two', 'http://127.0.0.1:8001/static/1694509182069_bg1.jpg', 'avccc', 'aaaa', 3, null, 1, 1, 0, 0, '2023-09-12 17:00:03', '2023-09-12 17:00:03', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (18, 'test_edit_before', '', 'ac', 'aaac', 3, null, 1, 1, 0, 0, '2023-09-12 17:10:22', '2023-09-12 17:10:22', 1, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (20, 'test_edit_after', 'http://127.0.0.1:8001/static/1694510005382_bg1.jpg', 'ac', 'aac', 3, null, 1, 1, 0, 0, '2023-09-12 17:13:37', '2023-09-12 17:13:37', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (22, 'in_config_1', 'http://127.0.0.1:8001/static/1694510115096_bg1.jpg', 'aac', 'aa', 3, null, 1, 1, 0, 0, '2023-09-12 17:15:23', '2023-09-12 17:15:23', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (23, 'in_config2', 'http://127.0.0.1:8001/static/1694510170533_bg1.jpg', 'aaaaa', 'ccccc', 2, null, 1, 1, 0, 0, '2023-09-12 17:16:17', '2023-09-12 17:16:17', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (24, 'test_modify_one', '', 'aaa', 'ccc', 3, null, 1, 1, 1, 0, '2023-09-12 17:24:40', '2023-09-12 17:24:40', 0, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (25, 'test_modofy_two', 'http://127.0.0.1:8001/static/1694510706060_bg1.jpg', 'ad', 'acaaaa', 2, null, 0, 1, 1, 0, '2023-09-12 17:25:12', '2023-09-12 18:37:27', 6, null, null, null);
INSERT INTO blog (id, title, header_image, description, content, category_id, tag_id_list, public_flag, comment_flag, top_flag, delete_flag, create_time, update_time, visits, pwd, words, read_time) VALUES (26, 'test_com_one', 'http://127.0.0.1:8001/static/1694515076435_bg1.jpg', 'da', 'accc', 4, null, 1, 1, 0, 0, '2023-09-12 18:38:06', '2023-09-15 11:32:08', 8, null, null, null);

create table blog_tag_relation
(
    id      int auto_increment
        primary key,
    blog_id int not null,
    tag_id  int not null
);

INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (1, 1, 1);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (2, 2, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (3, 2, 3);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (4, 3, 4);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (5, 3, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (6, 3, 3);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (7, 1, 3);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (8, 4, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (9, 5, 1);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (10, 5, 4);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (11, 0, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (12, 8, 1);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (13, 8, 3);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (14, 8, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (15, 10, 1);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (16, 10, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (19, 10, 3);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (20, 11, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (21, 11, 4);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (22, 14, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (23, 14, 3);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (24, 14, 4);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (25, 18, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (26, 18, 4);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (27, 20, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (28, 20, 3);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (29, 22, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (30, 22, 4);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (31, 23, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (32, 24, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (33, 24, 4);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (34, 25, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (35, 25, 4);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (36, 25, 3);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (37, 26, 2);
INSERT INTO blog_tag_relation (id, blog_id, tag_id) VALUES (38, 26, 4);

create table category
(
    id          int auto_increment
        primary key,
    name        varchar(32)          not null,
    enable      tinyint(1) default 1 null,
    delete_flag tinyint(1) default 0 null
);

INSERT INTO category (id, name, enable, delete_flag) VALUES (2, 'two_mod', 1, 0);
INSERT INTO category (id, name, enable, delete_flag) VALUES (3, 'three', 1, 0);
INSERT INTO category (id, name, enable, delete_flag) VALUES (4, 'four', 1, 0);

create table comment
(
    id           int auto_increment
        primary key,
    blog_id      int                                  null,
    root_id      int        default -1                null,
    parent_id    int        default -1                null,
    content      text                                 not null,
    nickname     varchar(16)                          null,
    avatar       varchar(128)                         null,
    email        varchar(128)                         null,
    account      varchar(32)                          null,
    account_type varchar(32)                          null,
    remind_flag  tinyint(1) default 0                 null,
    delete_flag  tinyint(1) default 0                 null,
    create_time  datetime   default CURRENT_TIMESTAMP null,
    website      varchar(128)                         null
);

INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (4, -1, -1, -1, '你是煞笔吧', 'rewrite', 'http://127.0.0.1:8001/static/2547400215_1693411518888.jpg', 'sb', '2547400215', 'QQ', 1, 0, '2023-08-31 00:05:19', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (5, -1, -1, -1, 'aaaa', 'rewrite', 'http://127.0.0.1:8001/static/2547400215_1693638928993.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-02 15:20:44', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (6, -1, 5, 5, 'reply_test', 'rewrite', 'http://127.0.0.1:8001/static/2547400215_1693638928993.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-02 15:21:25', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (7, -1, 5, 5, 'sb a sb a', 'rewrite', 'http://127.0.0.1:8001/static/2547400215_1693638928993.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-02 15:35:54', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (8, -1, 5, 7, 'aaaacccc', 'rewrite', 'http://127.0.0.1:8001/static/2547400215_1693638928993.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-02 16:02:03', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (9, -1, -1, -1, 'aa_zz_aa__zz', 'rewrite', 'http://127.0.0.1:8001/static/2547400215_1693638928993.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-03 01:40:14', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (10, 1, -1, -1, 'test_one_comment_blog', 'rewrite_aa', 'http://127.0.0.1:8001/static/2547400215_1693713773005.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-03 12:03:13', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (11, 1, 10, 10, 'ni_shi_sb_ba', 'rewrite_aa', 'http://127.0.0.1:8001/static/2547400215_1693713773005.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-03 12:03:41', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (12, 1, 10, 11, 'test_reload', 'rewrite_aa', 'http://127.0.0.1:8001/static/2547400215_1693713773005.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-03 12:10:53', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (13, -2, -1, -1, 'about comment one', 'rewrite_az', 'http://127.0.0.1:8001/static/2547400215_1693740758955.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-03 19:33:27', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (14, 1, -1, -1, 'hi,dsb', 'rewrite_b', 'http://127.0.0.1:8001/static/2547400215_1694574452046.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-13 11:11:50', null);
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (15, 1, -1, -1, 'hi,test_website', 'rewrite_b', 'http://127.0.0.1:8001/static/2547400215_1694574452046.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-13 11:13:58', 'http://127.0.0.1:9001');
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (16, 1, 10, 11, 'aaaaaaaaaaa__________bbbbbbbbbbbbbbb_cccccccccccccccccc_____________________DDDDDDDDDDDDDDDDD', 'rewrite_b', 'http://127.0.0.1:8001/static/2547400215_1694574452046.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-13 22:29:36', 'http://127.0.0.1:9001');
INSERT INTO comment (id, blog_id, root_id, parent_id, content, nickname, avatar, email, account, account_type, remind_flag, delete_flag, create_time, website) VALUES (17, 1, 10, 16, 'hello', 'rewrite_b', 'http://127.0.0.1:8001/static/2547400215_1694574452046.png', '2547400215@qq.com', null, null, 0, 0, '2023-09-13 23:16:37', 'http://127.0.0.1:9001');

create table friend
(
    id          int auto_increment
        primary key,
    name        varchar(16)          not null,
    website     varchar(128)         not null,
    signature   varchar(128)         null,
    avatar      varchar(128)         null,
    delete_flag tinyint(1) default 0 null
);

INSERT INTO friend (id, name, website, signature, avatar, delete_flag) VALUES (1, 'test_a', 'https://baidu.com', 'sbaaaaaaaaaaaaaaaaaaa', '/img/avatar.jpg', 0);
INSERT INTO friend (id, name, website, signature, avatar, delete_flag) VALUES (2, 'test_b', 'https://baidu.com', 'sb', '/img/avatar.jpg', 0);
INSERT INTO friend (id, name, website, signature, avatar, delete_flag) VALUES (3, 'test_c', 'https://baidu.com', 'bbbbbbbbbbbbbbbb', '/img/avatar.jpg', 0);
INSERT INTO friend (id, name, website, signature, avatar, delete_flag) VALUES (4, 'test_d', 'https://baidu.com', 'ssswww', '/img/avatar.jpg', 0);

create table moment
(
    id          int auto_increment
        primary key,
    content     text                                 not null,
    create_time datetime   default CURRENT_TIMESTAMP null,
    likes       int        default 0                 null,
    public_flag tinyint(1) default 1                 null,
    delete_flag tinyint(1) default 0                 null
);

INSERT INTO moment (id, content, create_time, likes, public_flag, delete_flag) VALUES (1, '# Moment
sb
## two
avc
## three
sb
## four
four', '2023-09-19 20:39:48', 6, 1, 0);
INSERT INTO moment (id, content, create_time, likes, public_flag, delete_flag) VALUES (2, '# Moment222
2sb
## two
avb', '2023-08-29 17:11:58', 6, 1, 0);
INSERT INTO moment (id, content, create_time, likes, public_flag, delete_flag) VALUES (3, '# test
aaa', '2023-09-18 23:42:10', 0, 1, 1);
INSERT INTO moment (id, content, create_time, likes, public_flag, delete_flag) VALUES (4, '# TEST_ADD
add_test', '2023-09-19 20:59:58', 0, 1, 0);
INSERT INTO moment (id, content, create_time, likes, public_flag, delete_flag) VALUES (5, '# TTT
ac', '2023-09-19 21:02:55', 0, 1, 0);

create table project
(
    id           int auto_increment
        primary key,
    name         varchar(32)          null,
    name_en      varchar(32)          null,
    description  text                 not null,
    git_url      varchar(128)         not null,
    website      varchar(128)         null,
    comment_flag tinyint(1) default 1 null
);

INSERT INTO project (id, name, name_en, description, git_url, website, comment_flag) VALUES (1, 'RPC', 'RPC', '# RPC
## 项目背景
sb
## 项目设计', 'http://127.0.0.1', 'http://127.0.0.1', 1);

create table tag
(
    id          int auto_increment
        primary key,
    name        varchar(32)          not null,
    color       varchar(16)          not null,
    enable      tinyint(1) default 1 null,
    delete_flag tinyint(1) default 0 null
);

INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (1, 'tag', 'teal', 1, 0);
INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (2, 'tag_two', 'red', 1, 0);
INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (3, 'tag_three', 'yellow', 1, 0);
INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (4, 'tag_four', 'brown', 1, 0);
INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (5, 'tag_five', 'grey', 1, 1);
INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (6, 'tag', 'black', 1, 1);
INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (7, 'tag_', 'grey', 1, 1);
INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (8, 'test_tag_one', 'pink', 1, 1);
INSERT INTO tag (id, name, color, enable, delete_flag) VALUES (9, 'test_aaa', 'blue', 1, 1);