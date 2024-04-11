import {useRoutes} from "react-router-dom"
import {SelfRouter} from "./config/router/index";

function App() {

    const outlet = useRoutes(SelfRouter);
    return (<div>
            {outlet}
        </div>
    )
}

export default App
