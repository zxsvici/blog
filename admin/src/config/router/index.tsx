import Home from "../../views/index";
import Dashboard from "../../views/dashboard/index";
import {Navigate} from "react-router-dom"
import {lazy} from "react";
import Login from "@/views/login";

const BlogList = lazy(() => import("@/views/blog"));
const BlogEdit = lazy(() => import("@/views/blog/edit"));
const TagList = lazy(() => import("@/views/tag"));
const CategoryList = lazy(() => import("@/views/category"));
const CommentView = lazy(() => import("@/views/blog/comment"));
const FriendView = lazy(() => import("@/views/friend"));
const AboutView = lazy(() => import("@/views/about"));
const SiteView = lazy(() => import("@/views/site"));
const MomentList = lazy(() => import("@/views/moments"));
const MomentEdit = lazy(() => import("@/views/moments/edit"));

const SelfRouter = [
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/",
        element: <Home/>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/",
                element: <Navigate to={"/dashboard"}/>
            },
            {
                path: "/blogs",
                element: <BlogList/>
            },
            {
                path: "/blogs/edit/:id",
                element: <BlogEdit/>
            },
            {
                path: "/blogs/edit",
                element: <BlogEdit/>
            },
            {
                path: "/tags",
                element: <TagList/>
            },
            {
                path: "/categories",
                element: <CategoryList/>
            },
            {
                path: "/:bid/comments",
                element: <CommentView/>
            },
            {
                path: "/friends",
                element: <FriendView/>
            },
            {
                path: "/about",
                element: <AboutView/>
            },
            {
                path: "/sites",
                element: <SiteView/>
            },
            {
                path: "/moments",
                element: <MomentList/>
            },
            {
                path: "/moment/edit",
                element: <MomentEdit/>
            },
            {
                path: "/moment/edit/:id",
                element: <MomentEdit/>
            }
        ]
    }
]

export {
    SelfRouter
}