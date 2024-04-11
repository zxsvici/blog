// import {BlogInfo, BlogTag, Category} from "@/model/blog";
//
// const testCategory: Category = {
//     id: 1,
//     name: 'category1'
// };
//
// const testTagList: BlogTag[] = [
//     {
//         id: 1,
//         name: 'tag1',
//         color: 'red'
//     },
//     {
//         id: 2,
//         name: 'tag2',
//         color: 'green'
//     }
// ];
//
// const testBlog: BlogInfo = {
//     category: testCategory,
//     content: '## 磨刀不误砍柴工\n' +
//         '获取随机数组\n' +
//         '```java\n' +
//         '    /**\n' +
//         '     * 准备随机数组，用于比较排序效率\n' +
//         '     * @return\n' +
//         '     */\n' +
//         '    private static int[] getArray(){\n' +
//         '        int[] result = new int[50000];\n' +
//         '        for (int i = 0; i < 50000; i++) {\n' +
//         '            result[i] =(int) Math.round(Math.random() * 50000);\n' +
//         '        }\n' +
//         '        return result;\n' +
//         '    }\n' +
//         '```\n' +
//         '交换函数\n' +
//         '```java\n' +
//         '   /**\n' +
//         '     * 交换\n' +
//         '     * @param x 下标1\n' +
//         '     * @param y 下标2\n' +
//         '     * @param arr 数组\n' +
//         '     */\n' +
//         '    private static void swap(int x, int y, int[] arr){\n' +
//         '        arr[x] = arr[x] ^ arr[y];\n' +
//         '        arr[y] = arr[x] ^ arr[y];\n' +
//         '        arr[x] = arr[x] ^ arr[y];\n' +
//         '    }\n' +
//         '```\n' +
//         '输出检查是否有序\n' +
//         '```java\n' +
//         '    /**\n' +
//         '     * 输出检查是否完成排序\n' +
//         '     * @param arr 数组\n' +
//         '     */\n' +
//         '    private static void printf(int[] arr){\n' +
//         '        for (int anArr : arr) {\n' +
//         '            System.out.print(anArr + "  ");\n' +
//         '        }\n' +
//         '        System.out.println();\n' +
//         '    }\n' +
//         '```\n' +
//         '## 选择排序\n' +
//         '### 思想\n' +
//         '- 在数组中选出极端元素，放在数组最前面做为已排序数组\n' +
//         '- 在从未排序数组中继续重复第一步\n' +
//         '### 特点\n' +
//         '- 空间复杂度： O(1)\n' +
//         '- 时间复杂度： O(n<sup>2</sup>)\n' +
//         '- 平均：O(n<sup>2</sup>)\n' +
//         '- 最快：O(n<sup>2</sup>)\n' +
//         '- 最慢：O(n<sup>2</sup>)\n' +
//         '- 稳定性：不稳定（即排序后会影响原来相等元素的相对位置）\n' +
//         '```java\n' +
//         '   /**\n' +
//         '     * 选择排序 每次交换\n' +
//         '     * @param arr 数组\n' +
//         '     */\n' +
//         '    private static void selectSort1(int[] arr){\n' +
//         '        long start = System.currentTimeMillis();\n' +
//         '        for (int i = 0; i < arr.length; i++) {\n' +
//         '            for (int j = i + 1; j < arr.length; j++) {\n' +
//         '                if(arr[j] < arr[i]){\n' +
//         '                    swap(i,j,arr);\n' +
//         '                }\n' +
//         '            }\n' +
//         '        }\n' +
//         '        long end = System.currentTimeMillis();\n' +
//         '//        printf(arr);\n' +
//         '        System.out.println("selectSort1 ==>> " + (end - start));\n' +
//         '    }\n' +
//         '```\n' +
//         '\n' +
//         '优化点：不必每次都去交换，可以只记录极端元素的下标，一次比较完成后在交换。\n' +
//         '```java\n' +
//         '    /**\n' +
//         '     * 选择排序 记录下标，最后交换\n' +
//         '     * @param arr 数组\n' +
//         '     */\n' +
//         '    private static void selectSort2(int[] arr){\n' +
//         '        long start = System.currentTimeMillis();\n' +
//         '        for (int i = 0; i < arr.length; i++) {\n' +
//         '            int minIndex = i;\n' +
//         '            for (int j = i+1; j < arr.length; j++) {\n' +
//         '                minIndex = arr[minIndex] > arr[j] ? j : minIndex;\n' +
//         '            }\n' +
//         '            swap(minIndex,i,arr);\n' +
//         '        }\n' +
//         '        long end = System.currentTimeMillis();\n' +
//         '//        printf(arr);\n' +
//         '        System.out.println("selectSort2 ==>> " + (end - start));\n' +
//         '    }\n' +
//         '```\n' +
//         '\n' +
//         '## 冒泡排序\n' +
//         '### 思想\n' +
//         '- 顾名思义，就是咕隆咕隆冒泡泡\n' +
//         '- 进行最多 n-1 轮排序，每一轮的最大者都会位于数组最后\n' +
//         '- 第 i 轮就是从 0 - i，由 0 开始和相邻的元素进行 1 v 1，结束后进行位次交换，继续开始下一场上路 1 v 1 男人大战\n' +
//         '### 特点\n' +
//         '- 空间复杂度： O(1)\n' +
//         '- 时间复杂度： O(n<sup>2</sup>)\n' +
//         '- 平均：O(n<sup>2</sup>)\n' +
//         '- 最快：O(n)\n' +
//         '- 最慢：O(n<sup>2</sup>)\n' +
//         '- 稳定性：稳定\n' +
//         '\n' +
//         '判断整体是否已经有序\n' +
//         '```java\n' +
//         '    /**\n' +
//         '     * 冒泡排序 判断在一次冒泡后是否已经有序\n' +
//         '     * @param arr 数组\n' +
//         '     */\n' +
//         '    private static void bubbleSort1(int[] arr){\n' +
//         '        long start = System.currentTimeMillis();\n' +
//         '        for (int i = arr.length - 1; i > 0; i--) {\n' +
//         '            boolean flag = true;\n' +
//         '            for (int j = 0; j < i; j++) {\n' +
//         '                if(arr[j] > arr[j+1]){\n' +
//         '                    swap(j+1,j,arr);\n' +
//         '                    flag = false;\n' +
//         '                }\n' +
//         '            }\n' +
//         '            if(flag) break;\n' +
//         '        }\n' +
//         '        long end = System.currentTimeMillis();\n' +
//         '//        printf(arr);\n' +
//         '        System.out.println("bubbleSort1 ==>> " + (end - start));\n' +
//         '    }\n' +
//         '```\n' +
//         '记录上次排序最后 pk 的位置\n' +
//         '```java\n' +
//         '    /**\n' +
//         '     * 冒泡排序 记录上一次冒泡的位置\n' +
//         '     * @param arr\n' +
//         '     */\n' +
//         '    private static void bubbleSort2(int[] arr){\n' +
//         '        long start = System.currentTimeMillis();\n' +
//         '        for (int i = arr.length - 1; i > 0; i--) {\n' +
//         '            int last = 0;\n' +
//         '            for (int j = 0; j < i; j++) {\n' +
//         '                if(arr[j+1] < arr[j]){\n' +
//         '                    swap(j+1,j,arr);\n' +
//         '                    last = i + 1;\n' +
//         '                }\n' +
//         '            }\n' +
//         '            i = last;\n' +
//         '        }\n' +
//         '//        printf(arr);\n' +
//         '        long end = System.currentTimeMillis();\n' +
//         '        System.out.println("bubbleSort2 ==>> " + (end - start));\n' +
//         '    }\n' +
//         '```\n' +
//         '优化点：可双向冒泡，小的往前，大的往后\n' +
//         '```java\n' +
//         '    /**\n' +
//         '     * 冒泡排序 双向\n' +
//         '     * @param arr\n' +
//         '     */\n' +
//         '    private static void bubbleSort3(int[] arr){\n' +
//         '        long start = System.currentTimeMillis();\n' +
//         '        int left = 0, right = arr.length-1;\n' +
//         '        while(left < right){\n' +
//         '            for (int i = left; i < right; i++) {\n' +
//         '                if(arr[i] > arr[i+1]){\n' +
//         '                    swap(i,i+1,arr);\n' +
//         '                }\n' +
//         '            }\n' +
//         '            right--;\n' +
//         '            for (int i = right; i > left; i--) {\n' +
//         '                if(arr[i-1] > arr[i]){\n' +
//         '                    swap(i-1,i,arr);\n' +
//         '                }\n' +
//         '            }\n' +
//         '            left++;\n' +
//         '        }\n' +
//         '        long end = System.currentTimeMillis();\n' +
//         '//        printf(arr);\n' +
//         '        System.out.println("bubbleSort3 ==>> " + (end - start));\n' +
//         '    }\n' +
//         '}\n' +
//         '```\n' +
//         '## 插入排序\n' +
//         '### 思想\n' +
//         '- 将数组首位视为已经排好序的数组\n' +
//         '- 每次取出已排序数组后的一个元素，插入到已排序的数组中，插入的位置要使数组仍然有序。\n' +
//         '- 重复上一步\n' +
//         '### 使用情景\n' +
//         '- 数据量少\n' +
//         '- 数据本身比较有序\n' +
//         '### 特点\n' +
//         '- 空间复杂度： O(1)\n' +
//         '- 时间复杂度： O(n<sup>2</sup>)\n' +
//         '- 平均：O(n<sup>2</sup>)\n' +
//         '- 最快：O(n)\n' +
//         '- 最慢：O(n<sup>2</sup>)\n' +
//         '- 稳定性：稳定\n' +
//         '```java\n' +
//         '    /**\n' +
//         '     * 插入排序 迁移\n' +
//         '     * @param arr\n' +
//         '     */\n' +
//         '    private static void insertSort1(int[] arr){\n' +
//         '        long start = System.currentTimeMillis();\n' +
//         '        for (int i = 1; i < arr.length; i++) {\n' +
//         '//            当前插入的目标值\n' +
//         '            int target = arr[i];\n' +
//         '            int j;\n' +
//         '            for (j = i-1; j >= 0 && target < arr[j]; j--) {\n' +
//         '                arr[j+1] = arr[j];\n' +
//         '            }\n' +
//         '            arr[j+1] = target;\n' +
//         '        }\n' +
//         '        long end = System.currentTimeMillis();\n' +
//         '//        printf(arr);\n' +
//         '        System.out.println("insertSort1 ==>> " + (end - start));\n' +
//         '    }\n' +
//         '\n' +
//         '    /**\n' +
//         '     * 插入排序 交换\n' +
//         '     * @param arr\n' +
//         '     */\n' +
//         '    private static void insertSort2(int[] arr){\n' +
//         '        long start = System.currentTimeMillis();\n' +
//         '        for (int i = 1; i < arr.length; i++) {\n' +
//         '//            因为要交换，所以第二层循环的 j 要大于 0 防止下标越界\n' +
//         '            for (int j = i; j > 0 && arr[j] < arr[j-1]; j--) {\n' +
//         '                swap(j-1,j,arr);\n' +
//         '            }\n' +
//         '        }\n' +
//         '//        printf(arr);\n' +
//         '        long end = System.currentTimeMillis();\n' +
//         '        System.out.println("insertSort2 ==>> " + (end - start));\n' +
//         '    }\n' +
//         '```\n' +
//         '优化点：插入的关键在于寻找插入的位置，因为插入的是一个有序数组，所以这里我们可以用二分查找来提高排序的效率。\n' +
//         '```java\n' +
//         '    /**\n' +
//         '     * 插入排序 二分查找插入位置\n' +
//         '     * @param arr\n' +
//         '     */\n' +
//         '    private static void insertSort3(int[] arr){\n' +
//         '        long start = System.currentTimeMillis();\n' +
//         '        for (int i = 1; i < arr.length; i++) {\n' +
//         '            int target = arr[i];\n' +
//         '            int left = 0, right = i - 1;\n' +
//         '//            二分查找插入位置\n' +
//         '            while(left <= right){\n' +
//         '                int mid = left + (right - left)/2;\n' +
//         '                if(arr[mid] > target){\n' +
//         '                    right = mid -1;\n' +
//         '                }else {\n' +
//         '                    left = mid + 1;\n' +
//         '                }\n' +
//         '            }\n' +
//         '            for (int j = i - 1; j >= left ; j--) {\n' +
//         '                arr[j+1] = arr[j];\n' +
//         '            }\n' +
//         '            arr[left] = target;\n' +
//         '        }\n' +
//         '        long end = System.currentTimeMillis();\n' +
//         '//        printf(arr);\n' +
//         '        System.out.println("insertSort3 ==>> " + (end - start));\n' +
//         '    }\n' +
//         '```\n',
//     createTime: "2012-12-12",
//     description: "desc",
//     id: 1,
//     modifyTime: "2014-12-01",
//     tagList: testTagList,
//     title: "sb",
//     visits: 1148,
//     words: 7520
// }
//
// export {
//     testBlog,
//     testCategory,
//     testTagList
// };