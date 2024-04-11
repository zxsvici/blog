import {Tabs} from "antd";
import BlogLineCharts from "@/views/dashboard/line";
import BlogPieCharts from "@/views/dashboard/pie";
import FootprintStatisticsAreaMap from "@/views/dashboard/area";

const Dashboard = () => {
    const items = [
        {
            key: 'line',
            label: '博客浏览量',
            children: <BlogLineCharts/>
        },
        {
            key: 'pie',
            label: '博客明细',
            children: <BlogPieCharts/>
        },
        {
            key: 'area',
            label: '足迹',
            children: <FootprintStatisticsAreaMap/>
        },
    ];

    return <Tabs items={items}/>
}

export default Dashboard;