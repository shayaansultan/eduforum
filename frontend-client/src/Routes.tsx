import { Route } from "react-router-dom"
import Layout from "./components/Layout"
import ThreadList, {threadsLoader} from "./components/ThreadList"

const routes = [
    <Route path="/" element={<Layout />}>,
        <Route index element={<ThreadList />} loader={threadsLoader}/>
    </Route>
]

export default routes