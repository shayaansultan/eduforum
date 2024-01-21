import { Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage, {homePageLoader} from "./pages/HomePage"
import ThreadDetailPage, {threadDetailPageLoader} from "./pages/ThreadDetailPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

const routes = [
    <Route path="/" element={<Layout />}>,
        <Route index element={<HomePage />} loader={homePageLoader}/>
        <Route path="threads/:thread_id" element={<ThreadDetailPage />} loader={threadDetailPageLoader}/>
        <Route path="/login" element={<LoginPage />} />,
        <Route path="/register" element={<RegisterPage />} />,
    </Route>,
]

export default routes