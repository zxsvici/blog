import {useRoutes} from "react-router-dom"
import BaseRouter from "@/config/route";
import 'semantic-ui-css/semantic.min.css'
import "@/assets/css/markdown.scss"
import "@/assets/css/base.scss"
import '@/assets/css/markdown-code-copy.scss'
import '@/assets/css/font.scss'

function App() {
  const outlet = useRoutes(BaseRouter);
  return (
      <div style={{height: "100%"}}>
          {outlet}
      </div>
  )
}

export default App
