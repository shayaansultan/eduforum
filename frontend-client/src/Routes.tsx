import { Route } from "react-router-dom"
import ThreadList from "./components/ThreadList"

const routes = [
    <Route path="/" element={<ThreadList />} />
]

export default routes