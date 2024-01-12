import { Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage, {homePageLoader} from "./pages/HomePage"

const routes = [
    <Route path="/" element={<Layout />}>,
        <Route index element={<HomePage />} loader={homePageLoader}/>
    </Route>
]

export default routes