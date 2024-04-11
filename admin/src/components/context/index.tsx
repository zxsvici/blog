import {TagInfo} from "@/model/tag";
import {CategoryInfo} from "@/model/category";
import {createContext, useContext, useEffect, useState} from "react";
import viciRequest from "@/config/axios";
import {createStore} from "redux";
import {createStoreHook} from "react-redux";

interface CacheContextModel {
    tagMap: Map<number, TagInfo>;
    categoryMap: Map<number, CategoryInfo>;
    setTagMap: (tagMap: Map<number, TagInfo>) => void;
    setCategoryMap: (categoryMap: Map<number, CategoryInfo>) => void;
}

const CacheContext = createContext<CacheContextModel>({
    categoryMap: new Map<number, CategoryInfo>(),
    setCategoryMap(categoryMap: Map<number, CategoryInfo>): void {},
    tagMap: new Map<number, TagInfo>(),
    setTagMap(tagMap: Map<number, TagInfo>): void {},
});

const SelfCacheProvider = ({children}) => {

    const [tagMap, setTagMap] = useState<Map<number, TagInfo>>(new Map<number, TagInfo>());
    const [categoryMap, setCategoryMap] = useState<Map<number, CategoryInfo>>(new Map<number, CategoryInfo>());

    useEffect(() => {
        async function fetchData() {
            try {

                viciRequest.get('/tags').then((res: any) => {
                    const tags = res as TagInfo[];
                    setTagMap(new Map(tags.map(item => [item.id, item])));
                })
                viciRequest.get('/categories').then((res: any) => {
                    const categories = res as CategoryInfo[];
                    setCategoryMap(new Map(categories.map(item => [item.id, item])));
                })
            } catch (error) {
                // 错误处理逻辑
            }
        }

        fetchData();
    }, []);

    return (
        <CacheContext.Provider value={{
            tagMap, setTagMap,
            categoryMap, setCategoryMap
        }}>
            {children}
        </CacheContext.Provider>
    );

}

const useSelfCacheContext = () => useContext(CacheContext);

export {
    SelfCacheProvider,
    useSelfCacheContext
}