import {useNavigate} from "react-router-dom";

const navigateTo = (path: string) => {
    const navigate = useNavigate();
    navigate(path);
}

export {
    navigateTo
}