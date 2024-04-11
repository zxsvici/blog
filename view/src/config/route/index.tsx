import {lazy} from "react";
import { Navigate } from "react-router-dom";
import Home from "@/views";

const ProjectView = lazy(() => import("@/views/project"));
const BlogList = lazy(() => import("@/views/blog/list"));
const BlogView = lazy(() => import("@/components/blog/view"));
const Archives = lazy(() => import("@/views/archives"));
const About = lazy(() => import("@/views/about"));
const Friends = lazy(() => import("@/views/friends"));
const Moments = lazy(() => import("@/views/moments"));

const BaseRoute = [
    {
        path: "/",
        element: <Home/>,
        children: [
            {
                path: "/",
                element: <Navigate to={"/home"}/>
            },
            {
                path: '/home',
                element: <BlogList/>
            },
            {
                path: '/archives',
                element: <Archives/>
            },
            {
                path: '/moments',
                element: <Moments/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/friends',
                element: <Friends/>
            },
            {
                path: '/projects/:id',
                element: <ProjectView/>
            },
            {
                path: '/blogs/:id',
                element: <BlogView/>
            }
        ],
    }
]

export default BaseRoute;