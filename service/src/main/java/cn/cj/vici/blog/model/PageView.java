package cn.cj.vici.blog.model;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Data
@Builder
public class PageView<T> {


    /**
     * 页面信息
     */
    private PageInfo page;

    /**
     * 数据列表
     */
    private List<T> list;

    public static <T, R> PageView<R> convert(PageView<T> source, Function<T, R> converter) {
        return PageView.<R>builder()
                .page(source.page)
                .list(source.list
                        .stream()
                        .map(converter)
                        .collect(Collectors.toList()))
                .build();
    }

    @Data
    @Builder
    public static class PageInfo {

        /**
         * 当前页
         */
        private Long pageNo;

        /**
         * 页容量
         */
        private Long pageSize;

        /**
         * 总条数
         */
        private Long total;

        /**
         * 总页数
         */
        private Long pages;
    }

    public static <T> PageView<T> fromPage(Page<T> page) {
        return PageView.<T>builder()
                .page(PageInfo.builder()
                        .pages(page.getPages())
                        .pageNo(page.getCurrent())
                        .pageSize(page.getSize())
                        .total(page.getTotal())
                        .build())
                .list(page.getRecords())
                .build();
    }

    public static <T, R> PageView<R> fromPage(Page<T> page, Function<T, R> converter) {
        return PageView.<R>builder()
                .page(PageInfo.builder()
                        .pages(page.getPages())
                        .pageNo(page.getCurrent())
                        .pageSize(page.getSize())
                        .total(page.getTotal())
                        .build())
                .list(page.getRecords()
                        .stream()
                        .map(converter)
                        .collect(Collectors.toList()))
                .build();
    }

    public static <T> PageView<T> empty() {
        return PageView.<T>builder()
                .page(PageInfo.builder()
                        .pages(0L)
                        .pageNo(1L)
                        .pageSize(10L)
                        .total(0L)
                        .build())
                .list(Collections.emptyList())
                .build();
    }
}
