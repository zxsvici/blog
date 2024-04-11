import {createContext, useContext, useEffect, useState} from 'react';
import {BlogTag, BlogViewTocItem, Category, QueryType} from "@/model/blog";
import baseRequest from "@/config/axios";
import {MINT_GREEN} from "@/constans/color";
import {Project} from "@/model/project";


interface CacheContextType {
    tocItems: BlogViewTocItem[];
    tagList: BlogTag[];
    categories: Category[];
    setTocItems: (tocItems: BlogViewTocItem[]) => void;
    setTagList: (tagList: BlogTag[]) => void;
    setCategories: (categories: Category[]) => void;
    projectList: Project[];
    setProjectList: (projectList: Project[]) => void;
}

const CacheContext = createContext<CacheContextType>(undefined);

export const CacheProvider = ({ children }) => {
    const [tocItems, setTocItems] = useState<BlogViewTocItem[]>([]);
    const [tagList, setTagList] = useState<BlogTag[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [projectList, setProjectList] = useState<Project[]>([]);

    useEffect(() => {
        baseRequest.get('/tags').then((res: any) => {
            const tags = res as BlogTag[];
            setTagList(tags);
        }).catch(e => {
            setTagList([]);
        }).finally(() => {

        });

        const categoryList: Category[] = [];
        baseRequest.get('/categories').then((res: any) => {
            const categories = res as Category[];
            categories.forEach(item => categoryList.push(item))
        }).catch(e => {

        }).finally(() => {
            setCategories(categoryList);
        });

        // baseRequest.get('/projects').then((res: any) => {
        //     const projects = res as Project[];
        //     setProjectList(projects);
        // });
    }, []);

    return (
        <CacheContext.Provider value={{
            tocItems, setTocItems,
            tagList, setTagList,
            categories, setCategories,
            projectList, setProjectList
        }}>
            {children}
        </CacheContext.Provider>
    );
};

export const useCacheContext = () => useContext(CacheContext);
