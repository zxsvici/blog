import {useEffect, useState} from "react";
import {Line} from "@ant-design/plots";

const BlogLineCharts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            {
                Date: '2023-06',
                scales: 0
            },
            {
                Date: '2023-07',
                scales: 0
            },
            {
                Date: '2023-08',
                scales: 0
            },
            {
                Date: '2023-09',
                scales: 0
            },
            {
                Date: '2023-10',
                scales: 0
            },
            {
                Date: '2023-11',
                scales: 0
            },
            {
                Date: '2023-12',
                scales: 0
            },
            {
                Date: '2024-01',
                scales: 0
            },
            {
                Date: '2024-02',
                scales: 0
            },
            {
                Date: '2024-03',
                scales: 452
            },
        ])
    }, []);

    // const asyncFetch = () => {
    //     fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             console.log(json)
    //             setData(json)
    //         })
    //         .catch((error) => {
    //             console.log('fetch data failed', error);
    //         });
    // };
    const config = {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            // type: 'timeCat',
            tickCount: 5,
        },
        smooth: true,
    };

    return <Line
        data={data}
        padding={'auto'}
        xField={'Date'}
        yField={'scales'}
        xAxis={{tickCount: 10}}
        smooth={true}
    />;
}

export default BlogLineCharts;