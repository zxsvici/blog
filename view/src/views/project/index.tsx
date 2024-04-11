import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Project} from "@/model/project";
import baseRequest from "@/config/axios";
import markdown from "@/utils/markdown";
import {useCacheContext} from "@/components/context";

const ProjectView = () => {
    const {id} = useParams();
    const {setTocItems} = useCacheContext();
    const [data, setData] = useState<Project>({
        description: "",
        gitUrl: "",
        id: 0,
        name: "",
        nameEn: "",
        website: ""
    });

    useEffect(() => {
        baseRequest.get(`/projects/${id}`).then((res: any) => {
            const response = res as Project;
            let parse = markdown.parse(response.description);
            response.description = parse.html;
            setTocItems(parse.tocItems);
            setData(response);
        });
    }, [id]);

    return (
        <div>
            <div className={'ui padded attached segment m-padded-tb-large'}>
                <div className={'ui middle aligned mobile reversed stackable grid m-margin-lr'}>
                    <h1 className={'ui header m-center'}>{data.name}</h1>
                    <div className={'markdown attached m-padded-tb-small content'}
                         dangerouslySetInnerHTML={{__html: data.description}}/>
                </div>
            </div>
        </div>
    )
}

export default ProjectView;