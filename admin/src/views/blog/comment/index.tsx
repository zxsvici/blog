import {useParams} from "react-router-dom";
import CommentList from "@/components/comment";

const CommentView = () => {

    const {bid} = useParams();

    return (
        <div>
            <CommentList bid={bid}/>
        </div>
    )
}

export default CommentView;